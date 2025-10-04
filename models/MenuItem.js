const mongoose = require('mongoose')

const MenuItem = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['spicy', 'sweet','sour'],
        required:true,
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:String, 
        default:[]
    },
    num_sales:{
        type:Number,
        default:20
    }
})

const MenuItems = mongoose.model('MenuItems', MenuItem);
module.exports = MenuItems;
