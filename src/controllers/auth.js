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

const loginDeliveryPartner = async(req,reply)=>{

    try {
        const {email,password} = req.body;
        let deliveryPartner = await DeliveryPartner.findOne({email});
        if(!deliveryPartner){
            return reply.status(400).send({message:"Delivery Partner not exists"})
        }

        //Password
        const isMatch = password === deliveryPartner.password;
        if(!isMatch){
            return reply.status(400).send({message:"Invalid Credentials"})
        }

        const {accessToken,refreshToken} = generateTokens(deliveryPartner);
        return reply.send({
            message: "Login Sucessfully",
            accessToken,
            refreshToken,
            deliveryPartner
        });
    } catch (error) {
        return reply.status(500).send({message:"An error occured",error})
    }
}

const refreshToken = async(req,reply)=>{
    const {refreshToken} = req.body;
    if(!refreshToken){
        return reply.status(404).send({message:"Referesh token required"})
    }

    try {
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        let user;
        if(decoded.role === 'Customer'){
            user = await Customer.findOne({_id:decoded.userId})
        }else if(decoded.role === 'DeliveryPartner'){
            user = await DeliveryPartner.findOne({_id:decoded.userId});
        }else{
            return reply.status(403).send({message:"Invalid Role"})
        }

        //check token stored in user
        if(!user){
            return reply.status(403).send({message:"Invalid Referesh Token"})
        }

        //Note: we rename referesh token here! we are asking extract tokens from generateTokens(user) but refreshToken store in a new variable 
        const {accessToken,refreshToken:newRefershToken} = generateTokens(user);
        return reply.send({
            message:"Token Refreshed",
            accessToken,
            refreshToken:newRefershToken
        });

    } catch (error) {
        return reply.status(403).send({message:"Invalid Referesh Token"})
    }
}

const fetchUser = async(req,reply)=>{
    try {
        const {userId,role} = req.user;
        console.log(userId,role);
        let user;

        if(role === 'Customer'){
            user = await Customer.findOne({_id:userId});
        }else if(role === 'DeliveryPartner'){
            user = await DeliveryPartner.findOne({_id:userId});
        }else{
            return reply.status(403).send({message:"Invalid Role"})
        }
        if(!user){
            return reply.status(404).send({message:"User not found"})
        }

        return reply.send({
            message:"Fetch user successfully",
            user,
        })

    } catch (error) {
        return reply.status(500).send({message:"An error occured while fetching user",error})
    }
}

module.exports={
    loginCustomer,
    loginDeliveryPartner,
    refreshToken,
    fetchUser
}
