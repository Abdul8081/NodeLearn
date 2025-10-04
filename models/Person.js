const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
    name:{
        type:String, 
        required:true
    },
    age:{
        type:Number, 
    },
    work:{
        type:String,
        enum:['chef', 'owner', 'manager'],
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    }

})

const Person = mongoose.model('Person', personSchema);
module.exports = Person;