const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const cors = require('cors');

const PORT = process.env.PORT || 5000;

const router = require('./router');
const {addUser, removeUser, getUsersInRooms, getUser} = require('./users');

//setup socket.io
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const usersid = {};
io.on('connection', (socket)=>{
    // console.log('we have a new connection!!!');
    if(!usersid[socket.id]){
        usersid[socket.id] = socket.id;
    }

    io.sockets.emit("currentuserId", socket.id);
    io.sockets.emit("allUsersid", usersid);

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
    socket.on("callUser", (data)=>{
        io.to(data.userToCall).emit('callin', {signal: data.signalData, from: data.from});
    })

    socket.on("acceptCall", (data)=>{
        io.to(data.to).emit('callAccepted', data.signal);
    })
    // peer call end

    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message', {user:'admin', text:`${user.name} has left.`})
        }
    })
})

app.use(router);
app.use(cors());
//runningserver
server.listen(PORT, ()=>console.log(`Server has started on port ${PORT}`));