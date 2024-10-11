require('dotenv').config()
const mongoose = require("mongoose");
const {} = require('./src/models/index.js')
const seedDatabase= async ()=>{
    try {
        //connect database
        const uri = process.env.MONGO_URI;
        await mongoose.connect(uri,{dbName:'BlinkitDatabase'});
    } catch (error) {
        console.log(error);
    }finally{

    }
}

seedDatabase();
