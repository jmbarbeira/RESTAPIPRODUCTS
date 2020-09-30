const dotenv = require ('dotenv');
dotenv.config({ path: './env/.env' });


const express= require('express');
const app = express();
const bodyParser= require('body-parser');
const mongoose = require ('mongoose');


const appProduct = require('./routes/product');
const appSupplier = require('./routes/supplier');
const appUser = require('./routes/user');

const uri = process.env.URI_MONGO;
const opciones={useNewUrlParser: true,useUnifiedTopology:true, useCreateIndex: true,useFindAndModify:false};
mongoose.connect(uri,opciones)
.then(()=>{
    console.log('Respuesta base de datos ok')
})
.catch((err)=>{
    console.log('Error de conexion',err)
})

 app.use(bodyParser.urlencoded({extended:true}));
 app.use(bodyParser.json());

 app.use('/product',appProduct);
 app.use('/supplier',appSupplier);
 app.use('/user',appUser);

const port =process.env.PORT;
app.listen(port,()=>{
    console.log(`Server listening on http://localhost:${port}`)
})
