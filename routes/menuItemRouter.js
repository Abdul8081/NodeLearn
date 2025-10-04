const express = require('express')
const router = express.Router();
const MenuItem = require('../models/MenuItem')


router.get('/', async (req, res)=>{
    try{
        const menuItem = await MenuItem.find();
        console.log(menuItem);
        res.status(200).json({
            success:true,
            message:"MenuItem fetched Successfully",
            menuItem
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success:false,
            message:'Error occured while fetching the menuItem'
        })
    }
})

router.post('/', async (req, res)=>{
    try{
        const data = req.body;
        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();

        console.log("Data saved");
        res.status(200).json({
            success:true,
            message:'Menu Item saved successfully',
            response
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in saving menu-items in the database"
        })
    }
})

//have to do, parameterized get based on taste, and put/patch and delete
router.get('/:taste', async (req, res)=>{
    try{
        const taste_id = req.params.taste;

        if(taste_id == "spicy" || taste_id == "sweet" || taste_id == "sour"){
            const find_item = await MenuItem.find({taste:taste_id});

            if(!find_item) res.status(404).json({success:false, message:"Item not found"});

            console.log("Item fetched");

            res.status(200).json({success:true, message:"Item fetched successfully", find_item});
        }
        else{
            console.log("Please enter the correct itme")
            res.status(404).json({success:false, message:"Please give the correct item"});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
})


//put/patch
router.put('/:id', async (req, res)=>{
    try{
        const update_id = req.params.id;
        const menu_id = await MenuItem.findByIdAndUpdate(
            update_id, 
            req.body,
            {new:true, runValidators:true}
        )
        if(!menu_id) res.status(404).json({success:false, message:"Id not found"})
        console.log("Menu updatead successfully");
        res.status(200).json({success:true, message:"Response updated through put"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
})

router.patch('/:id', async (req, res)=>{
    try{
        const update_id = req.params.id;
        const menu_id = await MenuItem.findByIdAndUpdate(
            update_id, 
            req.body,
            {new:true, runValidators:true}
        )
        if(!menu_id) res.status(404).json({success:false, message:"Id not found"})
        console.log("Menu updatead successfully");
        res.status(200).json({success:true, message:"Response updated through patch"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        const menu_id = req.params.id;
        const deleteId = await MenuItem.findByIdAndDelete(menu_id);
        if(!deleteId) res.status(404).json({success:false, message:"Id not found"});
        console.log("Id deleted successfully");
        res.status(200).json({success:true, message:"Id deleted successfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false, message:"Internal server error"})
    }
})

module.exports = router;