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
    ...userSchema,
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