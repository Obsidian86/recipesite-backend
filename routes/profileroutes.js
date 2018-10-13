const express = require('express');
const router = express.Router();

const User = require("../schema/userSchema");

router.post("/createuser", (req, res, next) =>{
    try {
        let { email, password } = req.body;
        let newUser = { username: email, password }
        User.create(newUser, async (err, User) =>{
            if(err) console.log(err)
            //User.save();
            res.status(200).json(User);
        });
    } catch (err) {
        return next();
    }
    
});

router.post("/login", (req, res) =>{ 
    let email = req.body.email;
    User.findOne({"username": email}, (err, user) =>{
        if(err) throw err;
        if(!user){
            res.json({"email": false, "fail" : "Username and/or password incorrect"});
        }else{
            if(req.body.password !== user.password) {
                res.json({"email": false, "fail" : "Username and/or password incorrect"});
            }else{
                res.json({ "email" : user.username })
            }
        }
    });  
});

module.exports = router;