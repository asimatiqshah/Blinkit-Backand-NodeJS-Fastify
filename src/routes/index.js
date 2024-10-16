const { authRoutes } = require("./auth");

const prefix = "/api";

const registerRoutes = async(fastify)=>{
    fastify.register(authRoutes,{prefix:prefix})
}

module.exports={
    registerRoutes
}