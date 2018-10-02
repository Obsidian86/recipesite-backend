const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const Recipe = require("./recipe_model");
const fetch = require("node-fetch");
const port = process.env.PORT || 8686;

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json({ extended: true }))

mongoose.connect("mongodb://localhost:27017/recipeDB", {useNewUrlParser: true});


/** TEST VARS **/
var ENV = "test";
const TEMPDATA = require("./tempData.js");
 
app.post("/search", (req, res) =>{ 
    const APP_ID = process.env.APP_ID;
    const APP_KEY = process.env.APP_KEY;
    if(ENV === "test"){
        let returnData = TEMPDATA;
        returnData.params = [];
        res.json( returnData ); 
    } else{
        let URL = `https://api.edamam.com/search?q=${req.body.searchFor}&app_id=${APP_ID}&app_key=${APP_KEY}`;    
        fetch(URL)
        .then(resp => resp.json())
        .then(resp => {
            let returnData = resp;
            returnData.params = [];
            res.json( returnData );
        });
    } 
});

////GET RECIPES FROM DATABASE
app.get("/gr", (req, res) =>{ 
    Recipe.find({}, (err, allRecipes) =>{
        if(err){
            console.log(err);
        }else{
            newRects = []; 
            for(let i=0; i<allRecipes.length; i++){
                let tNewRects = {"recipe": allRecipes[i]}
                newRects.push(tNewRects);
            } 
            let retRecs = {  "hits": newRects }
            res.json( retRecs );
        }
    });  
}); //End GET

////ADD NEW RECIPE FROM DATABASE
app.post("/gr", (req, res) =>{ 
    let newRecipe =  req.body;
    console.log( newRecipe );
    Recipe.create(newRecipe, (err, newRec) => {
        if(err){
            console.log(err);
        }else{
            newRec.save();
            res.json(newRec);
        }
    }); 
}); //End POST

////DELETE RECIPE FROM DATABASE
app.delete("/gr", (req, res) =>{
    let delRecipe =  req.body.deleteRecipe;
    console.log(delRecipe);
    Recipe.deleteOne( { uri: delRecipe }, (err, deleted) =>{
        if(err){ 
            throw err;
        }else{
            res.json("deleted");
        }
    });
}); //End DELETE

app.listen(port, ()=>{
    console.log('recipesite server started');
});