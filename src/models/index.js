const { Branch } = require("./branch");
const { Category } = require("./category");
const { Product } = require("./product");
const { Customer, Admin , Delivery } = require("./user");

module.exports={
    Customer,
    Delivery,
    Admin,
    Branch,
    Product,
    Category
}