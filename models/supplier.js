const mongoose =require('mongoose');

let provinces=["Comunidad de Madrid","Ontario"]

const SupplierSchema = new mongoose.Schema({
    name:{type:String,required:true},
    cif:{type:String,unique:true,required:true},
    address:{
        street:String,
        city:String,
        province:{type:String,enum: provinces},
        postal:String
    }

  
   
},{collection:'suppliers',timestamps:true})

module.exports = mongoose.model('Supplier',SupplierSchema);