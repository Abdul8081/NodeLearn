const expres = require('express')
const router = expres.Router();
const Person = require('../models/Person')
const {jwtAuthMiddleware, generateToken} = require('../middleware/jwt');

router.post('/signup', async (req, res)=>{
    try{
        const data = req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved, data was : ', response);

        const payload = {
            id: response.id,
            username: response.username
        }
        console.log("Payload is : ", payload);
        const token = generateToken(payload);
        console.log("Token received: ", token);

        res.status(200).json({
            success:true, 
            message:'data saved successfully',
            response:response,
            token:token
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

//login authentication setup
router.post('/login', async (req, res)=>{
    try{
        const {username, password} = req.body;
        const user = await Person.findOne({username:username});
        if(!user || !(await user.comparePassword(password))){
            return res.status(404).json('Invalid username or password');
        }

        const payload = {
            id : user._id,
            username:user.username
        }

        const token = generateToken(payload);

        if(!token) return res.status(404).json('Error occured in token generation');
        res.status(200).json({success:true, message:"User Logged in Successfully", token});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false, message:'Internal Server Error'});
    }
})

//new api prifile, which is authenticated
router.get('/profile', jwtAuthMiddleware, async (req, res)=>{
    try{
        const userData = req.user;
        console.log("User data : ", userData);
        const user = await Person.findOne({username:userData.username});
        if(!user) return res.status(404).json({success:false, message:"User not found"});

        res.status(200).json({user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
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
