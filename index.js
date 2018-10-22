const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");  
const port = process.env.PORT || 8686; 
const recipeRoutes = require('./routes/reciperoutes');
const listRoutes = require('./routes/listroutes');
const profileRoutes = require('./routes/profileroutes');
const {loggedIn, verifyUser } = require("./middleware/profile"); 

app.use(cors());
app.use(bodyParser.json({ extended: true }))

mongoose.connect("mongodb://localhost:27017/recipeDB", {useNewUrlParser: true}, err=>{
    if(err) throw err;
    console.log('connected to mongo');
});

app.use("/gr/:id", loggedIn, verifyUser, recipeRoutes);
app.use("/sl/:id", loggedIn, verifyUser, listRoutes); 
app.use("/profile", profileRoutes); 
 
//If no routes are found
app.use((req, res, next)=>{
    let error = new Error;
    error.status = 404;
    error.message = "Page not found.";
    next(error);
});

// Handles all errors
app.use((err, req, res, next)=>{
    return res.status(err.status || 500).json({
        error:{
            message: err.message || "Something unexpected has happend"
        }
    });
});

app.listen(port, ()=>{
    console.log('server started');
}); 