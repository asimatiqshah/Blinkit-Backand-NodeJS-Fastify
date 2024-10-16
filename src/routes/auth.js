const { loginCustomer, loginDeliveryPartner, refreshToken, fetchUser } = require("../controllers/auth");
const { verifyToken } = require("../middleware/auth");

const authRoutes = async(fastify,options)=>{
    fastify.post("/customer/login",loginCustomer);
    fastify.post("/delivery/login",loginDeliveryPartner);
    fastify.post("/refresh-token",refreshToken);
    fastify.get("/user",{preHandler:[verifyToken]},fetchUser);
}

module.exports = {
    authRoutes
};