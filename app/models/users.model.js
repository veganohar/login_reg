const mongoose = require("mongoose");

const User = mongoose.model(
    "USer",
    new mongoose.Schema({
        name:String,
        email:String,
        username:String,
        password:String,
        role:{
            type:String,
            default:'user'
        },
        isVerified:{
            type:Boolean,
            default:false
        },
        isActive:{
            type:Boolean,
            default:true
        },
        createdOn:{
            type:Date,
            default:Date.now
        }
    })
)

module.exports = User;