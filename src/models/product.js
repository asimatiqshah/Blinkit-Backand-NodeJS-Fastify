const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String,required:true },
    image: { type: String,required:true },
    price: { type: Number,required:true },
    discountPrice: { type: Number },
    quantity: { type: String,required:true },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categories"
    }
});

const Product = mongoose.model("products",productSchema);
module.exports={
    Product
}