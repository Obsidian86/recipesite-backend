require("dotenv").load();
const jwt = require("jsonwebtoken");

exports.loggedIn = function(req, res, next){ 
    try { 
        const token = req.headers.authorization.split(" ")[1]; 
        jwt.verify(token, process.env.SECRET, function(err, decoded){ 
            if(decoded){
                return next();
            }else{
                return next({
                    status: 401,
                    message: "Please log in first."
                });
            }
        });
    } catch (err) {
        return next({
            status: 401,
            message: "Please log in first"
        });
    }
}

exports.verifyUser = function(req, res, next){  
    try { 
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET, function(err, decoded){
            if(decoded && decoded.id === req.params.id){ 
                return next();
            }else{
                return next({
                    status: 401,
                    message: "Unauthorized"
                });
            }
        });
    } catch (err) { 
        return next({
            status: 401,
            message: "Unauthorized"
        });
    }
}