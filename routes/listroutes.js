const express = require('express');
const router = express.Router(); 

const shoppingList = require("./../schema/listSchema");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SGRID_KEY);
 
// EMAIL LIST
router.post("/sendlist", (req, res)=>{  /*
    let body = `<ol>`;
    for(let i=0; i<req.body.list.length; i++){
        body += `<li border>${req.body.list[i].status} - ${req.body.list[i].item}</li>`
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
            res.send(true);
        })
        .catch(err =>{
            console.error(err.toString());
        }); */ 
        res.json( {"sent": "List was successfully sent"}); 
});
router.post("/savelist", (req, res) =>{ 
    let newList = {
        "account": req.body.sendTo,
        "list": req.body.list
    }
    shoppingList.findOne({"account": req.body.sendTo}, (err, list) =>{
        if(err) throw console.log(err);
        if(!list){
            console.log(" NO LIST EXISTS");
            //No list exists Create new list
            shoppingList.create(newList, (err, newList) => {
                if(err){
                    console.log(err);
                }else{
                    newList.save(); 
                    res.json( {"sent": "ok"}); 
                }
            }); 
        }else{ 
            //if List exists, update current
            shoppingList.updateOne({"account": req.body.sendTo}, newList, (err, list) => {
                if(err){
                    console.log(err);
                }else{  
                    res.json({"sent": "ok"}); 
                }
            });
        }
    });
});

router.get("/getlist/:account", (req, res) =>{ 
    shoppingList.findOne({"account": req.params.account}, (err, list) =>{
        if(err) throw console.log(err);
        if(!list){
            res.json({"list": []}); 
        }else{
            res.json(list); 
        }
    });
});

module.exports = router;