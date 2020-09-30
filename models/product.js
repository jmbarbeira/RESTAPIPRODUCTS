const mongoose =require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{type:String,lowercase:true},
    displayName:String,
    sku:{type:String,unique:true},
    description:String,
    price: Number
  
    
     
})

module.exports = mongoose.model('Product',ProductSchema);