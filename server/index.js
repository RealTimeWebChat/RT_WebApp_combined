const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const cors = require('cors');

const config = require("./config/config")

const PORT = process.env.PORT || 5000;

const router = require('./router');
const {addUser, removeUser, getUsersInRooms, getUser} = require('./users');

//connect mongodb
const mongoose = require("mongoose");
const connect = mongoose.connect(config.dev_mongoURI,
    {
        useNewUrlParser:true, useUnifiedTopology:true,
        useCreateIndex: true, useFindAndModify: false
    })
    .then(()=>console.log('MongoDB Connected...'))
    .catch(err=>console.log(err));

// mongoose.Promise = global.Promise;
//setup socket.io
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Credentials', "true");
    next();
});


//setup api
require('./routes')(app); //other api
// app.use(router);
app.use(cors());
//runningserver
var serverapp = app.listen(PORT, ()=>console.log(`Server has started on port ${PORT}`));


const server = http.createServer(app);
// const io = socketio(server);

const io = socketio.listen(serverapp)

const usersid = {};
io.on('connection', (socket)=>{
    // console.log('we have a new connection!!!');

    socket.on('join', ({ name, room }, callback)=>{
        const { error, user } = addUser({id: socket.id, name, room});
        console.log(user)
        if(error) return callback(error);

        socket.join(user.room);

        socket.emit('message', {user:'admin', text:`${user.name}, welcome to the room ${user.room}`});
        console.log('welcome')
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text:`${user.name}, has joined!`})

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRooms(user.room) });

        callback();
    });

    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id);

        io.to(user.room).emit('message', {user: user.name, text: message});
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRooms(user.room)});
        callback();
    })

    //new code for peer call begin

    if(!usersid[socket.id]){
        usersid[socket.id] = socket.id;
    }

    io.sockets.emit("currentuserId", socket.id);
    io.sockets.emit("allUsersid", usersid);

    socket.on("callUser", (data)=>{
        io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
    })

    socket.on("acceptCall", (data)=>{
        io.to(data.to).emit('callAccepted', data.signal);
    })
    // peer call end

    socket.on('disconnect', ()=>{

        delete usersid[socket.id];
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message', {user:'admin', text:`${user.name} has left.`})
        }
    })
})


module.exports = app;