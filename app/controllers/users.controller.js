const db = require("../models");
const User = db.user;
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signup = async (req,res)=>{
    let obj = req.body;
    let user = new User();
    for(let p in obj){
        user[p] = obj[p];
    }
    user.password = await bcrypt.hash(user.password, saltRounds);
    user.save((err,response)=>{
        if(err){
            return res.status(500).send({message:err});
        }
        res.status(201).send({
            message:"User Registered Successfully",
            data:response
        })
    })
}