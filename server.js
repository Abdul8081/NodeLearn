const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db')
const PORT = process.env.PORT||3000;

require('dotenv').config();

app.use(bodyParser.json()); //this is kind of the middleware which process all the types of the data and store that in the req.body




app.get('/', (req, res)=>{
    res.send("Welcome to the hotel...")
})

const personRoutes = require('./routes/personRouter')
const menuItemRoutes = require('./routes/menuItemRouter')

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


app.listen(PORT, ()=>{
    console.log("App is listening : " + PORT);
})
