const express = require('express');
const router =  express.Router({mergeParams: true});

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
        res.json({"sent": "List was successfully sent"}); 
});
router.post("/savelist", async (req, res, next) =>{
    try {
        let user = req.params.id;  
        let newList = { user, "list": req.body.list } 
        let findList = await shoppingList.findOne({"user" : req.params.id}); 
        if(!findList){ 
            await shoppingList.create(newList);
            res.status(200).json({newList});
        }else{ 
            await shoppingList.updateOne({"user": req.params.id }, newList);
            res.status(200).json({newList});
        }
    } catch (err) {
        return next(err);
    } 
});

router.get("/getlist", async (req, res, next) =>{   
    try { 
        let findList = await shoppingList.findOne({ "user" : req.params.id }); 
        if(findList){
            res.status(200).json(findList.list);
        }else{
            res.status(200).json([])
        }
    } catch (err) {
        return next(err);
    }
});

module.exports = router;