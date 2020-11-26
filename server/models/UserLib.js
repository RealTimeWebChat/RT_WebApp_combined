const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        maxlength:50,
        default: ''
    },
    lastName:{
        type:String,
        maxlength: 50,
        default: ''
    },
    email:{
        type:String,
        default:''
    },
    agegroup:{
        type:String,
        default:''
    },
    password:{
        type:String,
        minlength:5,
        default:''
    },
    isDeleted:{
        type: Boolean,
        default:false
    }
    // role:{
    //     type:Number,
    //     default:0
    // },
    // image:String,
    // token:{
    //     type:String
    // },
    // tokenExp:{
    //     type:Number
    // }
});


UserSchema.methods.generateHash = function (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function (password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema)