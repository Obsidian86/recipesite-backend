const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../schema/userSchema");

router.post("/register", async (req, res, next) =>{ 
   try { 
        let { email, password } = req.body;
        let createdUser = await User.create({ username: email, password });
        let token = jwt.sign({ username: createdUser.username, id: createdUser._id}, process.env.SECRET);
        res.status(200).json({username: createdUser.username, id: createdUser._id, token});
    } catch (err) {
        return next({
            status: 400,
            message: "Unable to create user"
        });
    } 
});

router.post("/login", async (req, res, next) =>{ 
    try {
        let user = await User.findOne({ "username": req.body.email }); 
        let passMatch = await bcrypt.compare(req.body.password, user.password);
        if( passMatch ){
            let token = jwt.sign({ username: user.username, id: user._id}, process.env.SECRET);
            res.status(200).json({username: user.username, id: user._id, token});
        }else{
            return next({
                status: 400,
                message: "Incorrect email or password"
            });
        }
    } catch (err) {
        return next({
            status: 400,
            message: "Incorrect email or password"
        });
    }
});

module.exports = router;