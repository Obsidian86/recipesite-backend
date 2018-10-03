const express = require('express');
const router = express.Router();

const Recipe = require("../recipe_model");

////GET RECIPES FROM DATABASE
router.get("/", (req, res) =>{ 
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
});  

////ADD NEW RECIPE FROM DATABASE
router.post("/", (req, res) =>{ 
    let newRecipe =  req.body; 
    Recipe.create(newRecipe, (err, newRec) => {
        if(err){
            console.log(err);
        }else{
            newRec.save();
            res.json(newRec);
        }
    }); 
}); 

////DELETE RECIPE FROM DATABASE
router.delete("/", (req, res) =>{
    let delRecipe =  req.body.deleteRecipe;
    console.log(delRecipe);
    Recipe.deleteOne( { uri: delRecipe }, (err, deleted) =>{
        if(err){ 
            throw err;
        }else{
            res.json("deleted");
        }
    });
}); 

router.post("/search", (req, res) =>{ 
    /** TEST VARS **/
    var ENV = "test";
    const TEMPDATA = require("../tempData.js");

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

module.exports = router;