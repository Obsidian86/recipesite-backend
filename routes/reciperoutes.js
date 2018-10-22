const express = require('express');
const router = express.Router({mergeParams: true});
const fetch = require("node-fetch");
const Recipe = require("./../schema/recipe_model");
const User = require("./../schema/userSchema");

require("dotenv").config();
console.log(process.env.APP_ID); 

////GET SAVED RECIPES FROM DATABASE
router.get("/getrecipes", async (req, res, next) =>{
    try {
        let findUser = await User.findById(req.params.id).populate('recipes').exec((err, rec)=>{ 
            res.status(200).json({"hits": rec.recipes});
        });
    } catch (err) {
        return next(err)
    }
});  

////ADD NEW RECIPE TO DATABASE
router.post("/addrecipe", async (req, res, next) =>{ 
    try {
        let newRecipe =  req.body; 
        newRecipe.user = req.params.id;
        let createdRecipe = await Recipe.create(newRecipe); 
        let getUser = await User.findById(req.params.id); 
        getUser.recipes.push(createdRecipe.id); 
        await getUser.save();
        res.status(200).json(createdRecipe);
    } catch (err) {
        return next(err);
    }
    
}); 

////DELETE RECIPE FROM DATABASE
router.delete("/deleterecipe", async (req, res, next) =>{ 
    try {
        let delRecipe =  req.body.deleteRecipe; 
        await Recipe.deleteOne( { uri: delRecipe, user: req.params.id });
        res.status(200).json({"deleted": "okay"});
    } catch (err) {
        return next(err);
    }
}); 

router.post("/search", (req, res) =>{ 
    /** TEST VARS **/
    var ENV = "test";
    const TEMPDATA = require("../tempData.js"); 
    
    if(ENV === "test"){
        let returnData = TEMPDATA;
        returnData.params = [];
        res.json( returnData ); 
    } else{
        let URL = `https://api.edamam.com/search?q=${req.body.searchFor}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`;    
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