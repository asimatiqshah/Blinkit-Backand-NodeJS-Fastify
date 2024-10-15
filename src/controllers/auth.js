require('dotenv').config()
const jwt = require("jsonwebtoken");
const { Customer, DeliveryPartner } = require('../models/user');

const generateTokens = (user)=>{
    const accessToken = jwt.sign(
        {userId:user._id,role:user.role},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'1d'}
    );
    const refreshToken = jwt.sign(
        {userId:user._id,role:user.role},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:'1d'}
    );

    return {accessToken,refreshToken}
}


const loginCustomer = async(req,reply)=>{

    try {
        const {phone} = req.body;
        let customer = await Customer.findOne({phone});
        if(!customer){
            customer = await Customer.create({
                phone,
                role:'Customer',
                isActivated:true
            })
        }
        const {accessToken,refreshToken} = generateTokens(customer);
        return reply.send({
            message:customer ? "Login Sucessfully" : "Customer Created and Login In",
            accessToken,
            refreshToken,
            customer
        });
    } catch (error) {
        return reply.status(500).send({message:"An error occured",error})
    }
}
