const db = require("../models");
const User = db.user;

checkforDuplicateUsernameEmail = (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;

    User.findOne({ $or: [{ username: username }, { email: email }] }, (err, user) => {
            if (err) {
                return res.status(500).send({ message: err });
            }
            if (!user) {
                next();
            }else{
                if(username === user.username){
                    return res.status(401).send({ message: "Username already in use" });
                }
                if(email === user.email){
                    return res.status(401).send({ message: "Email already in use" });
                }
            }
    })
}

const userMiddleware = {
    checkforDuplicateUsernameEmail
}

module.exports = userMiddleware;