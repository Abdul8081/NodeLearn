const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtAuthMiddleware = (req, res, next)=>{

    const authorised = req.headers.authorization;
    if(!authorised) return res.status(401).json({error:'Token not found'});

    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'Unauthorized'});

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if(!decode) res.status(402).json({error:'token is not correct'});
        console.log("Decoded token ",decode)
        req.user = decode; // here we can use any things at the place of the user, only contex is here that we are sending with the variable name user

        next();
    }
    catch(err){
        throw next(err);
    }
}

const generateToken = (userData)=>{
    //some time when we not send userData as the object then it gives some error
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn:'24h'});
}

module.exports = {jwtAuthMiddleware, generateToken};