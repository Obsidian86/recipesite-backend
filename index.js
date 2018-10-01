const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const Recipe = require("./recipe_model");

app.use(cors());
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost/recipeDB");
 


////GET RECIPES FROM DATABASE
app.get("/gr", (req, res) =>{
    console.log("connected2");
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

app.listen(8686, ()=>{
    console.log('recipesite server started');
});