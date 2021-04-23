const db = require("../models");
const User = db.user;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const crs = require('crypto-random-string'); 
const config = require("../config/auth.config");
const nodemailer = require('nodemailer');

exports.signup = async (req,res)=>{
    const randomString = crs({length: 128});
    let obj = req.body;
    let user = new User(); 
    for(let p in obj){
        user[p] = obj[p];
    }
    user.password = await bcrypt.hash(user.password, saltRounds);
    user.randomString = randomString;
    user.save((err,response)=>{
        if(err){
            return res.status(500).send({message:err});
        }
        let transporter = nodemailer.createTransport(config.mailTransporter);
        let href = `${config.baseUrl}verify/verify-account/${response._id}/${randomString}`
        const mailData = {
            from: '"Email Verification" <challasasikanth890@gmail.com>',
            to: response.email,
            subject: "Email Verification",
            html: `Click <a href="${href}">here</a> to Verify the Email or copy paste this link in new tab ${href}`,
          };

          transporter.sendMail(mailData,(err,info)=>{
            if (err) {
                res.status(201).send({status:201, message: "User was registered successfully! Mail Error" });
              }
              else {
                res.status(201).send({status:201, message: "User was registered successfully! Mail Success" });
              }
          })
    })
}



exports.verifyEmail = (req,res)=>{
    let uid = req.params.uid;
    let randomString = req.params.secretCode;
    User.findOne({_id:uid},(err,user)=>{
        if (err) {
            return res.status(500).send({ message: err });
        }
        if(!user){
            res.render('pages/error',{error:'User not Found'});
            return;
        }
        if(user.randomString!==randomString){
            res.render('pages/error',{error:'Invalid Token'});
            return;
        }
        User.updateOne({_id:user._id},{$set:{isVerified:true},$unset:{randomString:randomString}},(err,response)=>{
            if (err) {
                return res.status(500).send({ message: err });
            }
            res.render('pages/verified');   
        })
    })
}