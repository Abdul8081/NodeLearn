const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('../models/Person'); // Adjust the path as needed

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        console.log('Received credentials:', username, password);
        
        // Add validation for input parameters
        if (!username || !password) {
            return done(null, false, { message: 'Username and password are required.' });
        }
        
        const user = await Person.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password.' });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        return done(error);
    }
}));



module.exports = passport; // Export configured passport