const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); 
const fetch = require("node-fetch");
const port = process.env.PORT || 8686;
const sgMail = require('@sendgrid/mail');
 
const recipeRoutes = require('./routes/reciperoutes');

require('dotenv').config();

sgMail.setApiKey(process.env.SGRID_KEY);


app.use(cors());
app.use(bodyParser.json({ extended: true }))

mongoose.connect("mongodb://localhost:27017/recipeDB", {useNewUrlParser: true});
 
app.use("/gr", recipeRoutes);
 
app.post("/sendlist", (req, res)=>{ 
    console.log( req.body.list)
    let body = `<ol>`;
    for(let i=0; i<req.body.list.length; i++){
        body += `<li border>${req.body.list[i].item}</li>`
    }
    body += `</ol>`;
    const msg = {
        to: req.body.sendTo,
        from: 'christopher@06designs.com',
        subject: `Here's your recipe list!`,
        html: body,
      };   
      sgMail.send(msg)
        .then(resp=>{
            console.log(resp);
        })
        .catch(err =>{
            console.error(err.toString());
        }); 
});

app.listen(port, ()=>{
    console.log('recipesite server started');
});