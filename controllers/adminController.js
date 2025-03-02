const TryCatch = require("../utils/TryCatch");
const prisma = require('../models');
const createError = require("../utils/createError");

///// ADMIN Account : Got Intial UserData from CLERK an d
exports.updateAccount = TryCatch(async (req, res) => {
    console.log('req.body', req.body);

    res.status(200).json({ message: "Success ADMIN Role" })
})

exports.getDashboord = TryCatch(async (req, res) => {
    res.status(200).json({ message: "Success Dashbord!" })
})


exports.getAllProductsDB = TryCatch(async (req, res) => {
    ///// Get all products in DB:
    const results = await prisma.product.findMany({
        include: {
            productImage: true //include to get productImage data too
        }
    });


    res.status(200).json({ message: "Success Get All Products DB", results })
})