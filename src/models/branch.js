const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
    name: { type: String,required:true },
    location: {
        latitude:{type:Number},
        longitude:{type:Number}
    },
    address:{type:String},
    deliveryPartners:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Delivery"
        }
    ]
});

const Branch = mongoose.model('branches',branchSchema);

module.exports={
    Branch
}