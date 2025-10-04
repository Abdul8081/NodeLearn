const mongoose = require('mongoose')

const mongoUrl = 'mongodb://127.0.0.1:27017/hotels'; //here we can our database name whatever we wanted to give

mongoose.connect(mongoUrl)
// .then(()=>console.log("MongoDB server started"))
// .catch((error)=> console.log("Error occured", + error));

const db = mongoose.connection; //this will create a db object and track db

db.on('connected', ()=>{
    console.log("MongoDB server connected")
})

db.on('error', ()=>{
    console.log("Error occured while mongodb server connection")
})

db.on('disconnected', ()=>{
    console.log("MongoDB server disconnected")
})


module.exports = db;



