const express = require ('express');

const app = express();

const Product = require('../models/product');

app.post('/',(req,res)=>{
    let product = new Product({
        name: req.body.name,
        displayName: req.body.name,
        sku:req.body.sku,
        description:req.body.description,
        price:req.body.price

    })
    product.save((err,product)=>{
        if (err){
            return res.status(400).json({error:err});
        }
        res.status(200).json({
            mesage:'Product was created correctly',
            product:product
        });
    })
})

app.get('/',(req,res)=>{
    Product.find({}).sort({name:1}).exec((err,products)=>{
    if(err){
        return res.status(400).json({message:err})
    }
    res.status(200).json({
        products:products
    })
    
})
})

app.get('/search/:param',(req,res)=>{
    Product.find({displayName:{$regex:req.params.param}},(err,products)=>{
        if (err){
            return res.status(400).json({mesage:err})
        }
        res.status(200).json({products:products

        })
    })

})


app.get('/:_id',(req,res)=>{
    Product.findOne({_id: req.params._id},(err,product)=>{
        if(err){
            return res.status(400).json({message:err})
        }
        res.status(200).json({
            product:product
        })
    })
    })

app.put('/:_id',(req,res)=>{

    let update={};
    if(req.body.name!==undefined){
        update.name=req.body.name;}
    if(req.body.description!==undefined){
        update.description=req.body.description;}
    if(req.body.price!==undefined){
        update.price=req.body.price;
    }
    console.log(update)
    Product.findByIdAndUpdate(req.params._id,{$set:update},(err,result)=>{
        if(err){
            return res.status(400).json({message:err})
        }
        res.status(200).json({message:`Product ${result.name} has been updated`})
    })
    

})

app.delete('/:_id',(req,res)=>{
    Product.findByIdAndDelete(req.params._id,(err,result)=>{
    if(err){
        return res.status(400).json({message:err})
    }
    res.status(200).json({message:`Product ${result.name} has been deleted`})
})
})

module.exports = app;