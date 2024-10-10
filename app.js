require('dotenv').config()
const fastify = require("fastify")
const {connectDB} = require("./src/config/connect.js")

const start= async()=>{
    const uri = process.env.MONGO_URI;
    connectDB(uri);
    const app = fastify();
    const PORT = process.env.PORT || 3000;
    app.listen({port:PORT,host: '0.0.0.0'},(err,address)=>{
        if(err){
            console.log(err);
        }else{
            console.log(`Blinkit Started on http://localhost:${PORT}`)
        }
    })
}

start();