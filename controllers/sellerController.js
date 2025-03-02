const createError = require("../utils/createError");
const TryCatch = require("../utils/TryCatch");
const prisma = require('../models/index')




///// API Get All-Products : http://localhost:8080/seller-center/products/all-products/${userID}, token
/// MerchantData = SellerData (req.user) + productSeller (Product Table - SellerID in DB)
exports.getMyProducts = TryCatch(async (req, res) => {
    const { userID } = req.params
    // console.log('userID', userID);
    const results = await prisma.product.findMany({
        where: { userID: Number(userID) },
        include: {
            productImage: true
        }
    })
    console.log('results', results);

    res.status(200).json({ message: "SUCESS! Get all products!", results })
})



///// API Seller ADD Product : /seller-center/add-product
exports.sellerADDProduct = TryCatch(async (req, res) => { //Only SELLER get to this path
    console.log("clerkID", req.user.id);
    ///// Get userID in DB where clerkID :
    const userDataDB = await prisma.user.findFirst({ where: { clerkID: req.user.id } })
    console.log('userDataDB >>>', userDataDB);
    ///// get userID to add in Product Table :
    const { userID } = userDataDB
    console.log('userID >>>', userID);

    const { value, imageData } = req.body
    console.log('imageData', imageData); //[]

    // console.log('value >>>', value); //for keep in Product
    ///// Add Product in DB :
    const productData = await prisma.product.create({
        data: { userID, ...value, categoryID: Number(value.categoryID), price: Number(value.price), stockQuantity: Number(value.stockQuantity) }
    })
    console.log('productData >>>', productData);
    ///// get ProductID where ProductName: to add ProductImage in DB, using productID
    const productDB = await prisma.product.findFirst({ where: { productID: productData.productID } })
    console.log('productID', productDB);
    const { productID } = productDB
    ///// Add ImageProduct into DB:
    const responseImage = await prisma.productImage.createMany({
        data: imageData.map(el => {
            return { productID: Number(productID), productImage: el.secure_url }
        })
    })
    console.log('responseImage', responseImage);
    res.status(200).json({ status: "SUCCESS", message: "Add product already!", results: { ...productData, ...responseImage } })
})


exports.sellerUPDATEProduct = TryCatch(async (req, res) => {
    console.log(' req.user', req.user);
    console.log(' req.param', req.params);

    ///// Find : customer(userData), all-products, ProductonOrder, Order-TotalPrice(Sale), rating, reviewPost
    res.status(200).json({ status: "SUCCESS", message: "Update Product already!" })
})

exports.sellerDELETEProduct = TryCatch(async (req, res) => {
    console.log(' req.param', req.params);
    const results = prisma.product.delete({ where: { productID: parseInt(req.params.productID) } })
    ///// Find : customer(userData), all-products, ProductonOrder, Order-TotalPrice(Sale), rating, reviewPost
    res.status(200).json({ status: "SUCCESS", message: "Delete Product already!" })
})







///// API Seller Dashboard : /seller-center/dashboard --> SellerData-ProductData-OrderData-ProductOnOrder
exports.sellerDashboard = TryCatch(async (req, res) => {
    console.log(' req.user', req.user);
    console.log(' req.param', req.params);

    ///// Find : customer(userData), all-products, ProductonOrder, Order-TotalPrice(Sale), rating, reviewPost
    res.status(200).json({ status: "SUCCESS", message: "Access Dashboard already!" })
})