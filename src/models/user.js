const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String },
    role: {
        type: String,
        enum: ["Customer", "Admin", "DeliveryPartner"],
        required: true
    },
    isActivated: { type: Boolean, default: false }
});

//Customer Schema
const customerSchema = new mongoose.Schema({
    ...userSchema.obj,
    phone: { type: Number,required:true,unique:true },
    role: {
        type: String,
        enum: ["Customer"],
        default:"Customer"
    },
    liveLocation: {
        latitude:{type:Number},
        longitude:{type:Number}
    },
    address:{type:String}
});

//Customer Schema
const deliveryPartnerSchema = new mongoose.Schema({
    ...userSchema.obj,
    email: { type: String,required:true,unique:true },
    password: { type: String,required:true },
    phone: { type: Number,required:true },
    role: {
        type: String,
        enum: ["DeliveryPartner"],
        default:"DeliveryPartner"
    },
    liveLocation: {
        latitude:{type:Number},
        longitude:{type:Number}
    },
    address:{type:String},
    branch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"branches"
    }
});

// Admin Schema
const adminSchema = new mongoose.Schema({
    ...userSchema.obj,
    email: { type: String,required:true,unique:true },
    password: { type: String,required:true },
    phone: { type: Number,required:true },
    role: {
        type: String,
        enum: ["Admin"],
        default:"Admin"
    }
});

//Create Model
const Customer = mongoose.model("customers",customerSchema);
const Delivery = mongoose.model("deliveries",deliveryPartnerSchema);
const Admin = mongoose.model("admins",adminSchema);

module.exports = {
    Customer,
    Delivery,
    Admin
};