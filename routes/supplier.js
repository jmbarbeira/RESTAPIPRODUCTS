const  express = require('express');

const app = express();

let Supplier = require('../models/supplier');

app.post('/',(req,res)=>{
    let supplier = new Supplier({
        name:req.body.name,
        cif:req.body.cif,
        address:{
            street:req.body.street,
            city:req.body.city,
            province:req.body.province,
            postal:req.body.postal
        }
    });
    supplier.save((err,result)=>{
        if(err){
            return res.status(400).json({message:err})
        }
        res.status(200).json({
            message: `Supplier ${result.name} has been created correctly`
        })
    })
})

module.exports=app;