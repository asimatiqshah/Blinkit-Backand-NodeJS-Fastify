require('dotenv').config()
const mongoose = require("mongoose");
const {Product,Category} = require('./src/models/index.js');
const {categories,products} = require('./src/seedData.js')
const seedDatabase= async ()=>{
    try {
        //connect database
        const uri = process.env.MONGO_URI;
        await mongoose.connect(uri,{dbName:'BlinkitDatabase'});

        await Product.deleteMany({});
        await Category.deleteMany({});

        const categoryDocs = await Category.insertMany(categories);

        const categoryMap = categoryDocs.reduce((total,current)=>{
            total[current.name] = current._id;
            return total;
        },{});

        const productWithCategoryIds = products.map((item,index)=>({
            ...item,
            category:categoryMap[item.category]
        }));

        await Product.insertMany(productWithCategoryIds);
        console.log("Data Seeded Sucessfully");



    } catch (error) {
        console.log("Error in Seeding Data ",error);
    }finally{
        mongoose.connection.close();
    }
}

seedDatabase();
