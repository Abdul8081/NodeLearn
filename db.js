const mongoose = require('mongoose')
require('dotenv').config();

// const mongoUrl = process.env.MONGODB_URL_LOCAL; //this is the local setul connection 

const mongoUrl = process.env.MONGODB_URL; //this is the local setul connection 



mongoose.connect(mongoUrl, {
    serverSelectionTimeoutMS: 5000,
})
.then(()=>console.log("MongoDB server started"))
.catch((error)=> console.log("Error occured", + error));

const db = mongoose.connection; //this will create a db object and track db

db.on('error', ()=>{
    console.log("Error occured while mongodb server connection")
})

db.on('disconnected', ()=>{
    console.log("MongoDB server disconnected")
})

module.exports = db;

