const expres = require('express')
const router = expres.Router();
const Person = require('../models/Person')

router.post('/', async (req, res)=>{
    try{
        const data = req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json({
            success:true, 
            message:'data saved successfully',
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false, 
            message:'Internal Server Error'
        });
    }
})

router.get('/', async (req, res)=>{
    try{
        const person = await Person.find();
        console.log("Data fetched");
        res.status(200).json({
            success:true,
            message:"Fetched data",
            person
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Error During fetching from database",
        })
    }
})

// parameterized api work
router.get('/:worktype', async (req, res)=>{
    try{
        const workTypeId = req.params.worktype;

        if(workTypeId == 'chef' || workTypeId =='owner' || workTypeId=='manager'){
            const response = await Person.findOne({work:workTypeId});

            if(!response) {
                res.status(404).json({success:false, message:'Invalid search occure'});
            }

            console.log('Data fetched');
            res.status(200).json({success:true, message:'Data fetched Successfully', response});
        }
        else{
            res.status(404).json({success:false, message:'Invalid data requested'});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({success:false, message:'Internal Server Error'})
    }
})


router.put('/:id', async (req, res)=>{
    try{
        const person_id = req.params.id;
        const updateId = await Person.findByIdAndUpdate(
            person_id,
            req.body,
            {new:true, runValidators:true}
        );
        if(!updateId) res.status(404).json({success:false, message:"Id not found"});
        console.log("Data updated  through patch");
        res.status(200).json({success:true, message:"Data updated successfully throuh put"});
    }catch(error){
        console.error(error);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
})


router.patch('/:id', async (req, res)=>{
    try{
        const person_id = req.params.id;
        const updatedId = await Person.findByIdAndUpdate(
            person_id, 
            req.body,
            {new:true, runValidators:true}
        )

        if(!updatedId) res.status(404).json({success:false, message:"Id not found"});
        
        console.log("Id updated through put");
        res.status(200).json({success:true, message:"Id updated through patch"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:true, message:"Internal Server Error"});
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        const person_id = req.params.id;
        const deleteId = await Person.findByIdAndDelete(person_id);

        if(!deleteId) res.status(404).json({success:false, message:"Person not found"});
        console.log("Person Deleted Successfully");
        res.status(200).json({success:true, message:"Person Deleted Successfully"});
    }
    catch(error){
        console.error(error);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
})


module.exports = router;
