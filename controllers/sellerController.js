const createError = require("../utils/createError");
const TryCatch = require("../utils/TryCatch");
const prisma = require('../models/index')
const jwt = require('jsonwebtoken')
const cloudinary = require('../config/cloudinary')
///// Seller must fill both email and phoneName : dont check identity
/// 1 User can have many Seller , each Merchant is validate by email, phoneNumber cant be Dup.

exports.sellerRegister = TryCatch(async (req, res) => {
    console.log('req.user', req.user); //from authorization
    const { userID } = req.user

    console.log('req.body', req.body);/// Must have userID too
    ///// seller must fill all data :
    for (const key in req.body) {
        if (!req.body[key]) {
            createError(400, "Please fill  all data")
        }
    }
    //---- each Merchant validate by email or phoneNumber or Merchant : cant be duplicate
    ///// Check Duplicate Data: Have in DB??? before create new Seller
    const { email, phoneNumber, merchantName } = req.body
    const dupEmail = await prisma.seller.findFirst({
        where: { email }
    })
    dupEmail && createError(400, `${email} already exists`)
    const dupPhoneNumber = await prisma.seller.findFirst({
        where: { phoneNumber }
    })
    dupPhoneNumber && createError(400, `${phoneNumber} already exists`)
    const dupMerchant = await prisma.seller.findFirst({
        where: { merchantName }
    })
    dupMerchant && createError(400, `${merchantName} already exists`)

    //////// Must have Password for Merchant --> hashPassword

    /// No dupMerchant : create new Seller into DB
    const newSeller = await prisma.seller.create({ data: { ...req.body, userID } })
    console.log('newSeller', newSeller);


    res.status(200).json({ status: "SUCCESS", message: "Register already!", newSeller })
})

/// Check isEamil or isPhonenumber?? : for using find user @Uniqe in data
const checkEmailorPhone = (identity) => {
    let identityKEY = ""
    if (/^[0-9]{10,15}$/.test(identity)) {
        identityKEY = 'phoneNumber'
    }
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(identity)) {
        identityKEY = 'email'
    }
    if (!identityKEY) {
        createError(400, 'only email or phone number')
    }
    return identityKEY
}

///// API Seller for Login : /seller-center/signin
exports.sellerSignin = TryCatch(async (req, res) => {
    console.log('req.body', req.body);
    const { identity } = req.body
    ///// Check identity is Email / PhoneNumber??:
    const identityKEY = checkEmailorPhone(identity)
    console.log('identityKEY', identityKEY);
    ///// find in DB: 
    const sellerData = await prisma.seller.findUnique({
        where: { [identityKEY]: identity }
    })
    !sellerData && createError(404, "Not found, Please to Register!")
    ///// Generate SellerToken :
    const sellerToken = jwt.sign(sellerData, process.env.JWT_SECRET, {
        expiresIn: '3d'
    })
    res.status(200).json({ status: "SUCCESS", message: "Signin already", sellerToken, sellerData })
})

// ///// API Seller for Account : /seller-center/account
// exports.sellerAccount = TryCatch(async (req, res) => {
//     // console.log('SellerData', req.user);
//     res.status(200).json({ status: "SUCCESS", message: "Access SellerAccount already!", SellerData: req.user })
// })

///// API Seller for Merchant : /seller-center/merchat
/// MerchantData = SellerData (req.user) + productSeller (Product Table - SellerID in DB)
exports.sellerMerchant = TryCatch(async (req, res) => {
    console.log('req.body#Controller', req.body);
    ///// Find all Product where userID in DB, product table :
    const { userID } = req.body
    console.log('userID', userID);
    const allMyProducts = await prisma.product.findMany({ where: { userID } })
    console.log('allMyProducts', allMyProducts);


    res.status(200).json({ message: "Hey!, My Merchant, Get all products!", results: allMyProducts })
})

///// API Seller ADD Product : /seller-center/add-product
exports.sellerProduct = TryCatch(async (req, res) => { //Only SELLER get to this path
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





    res.status(200).json({ status: "SUCCESS", message: "Add product already!" })
})





///// API Seller Dashboard : /seller-center/dashboard --> SellerData-ProductData-OrderData-ProductOnOrder
exports.sellerDashboard = TryCatch(async (req, res) => {
    console.log("SellerData", req.user);
    const { sellerID } = req.user
    ///// Get Data for Dashboard in DB: SellerData-ProductData-OrderData-ProductOnOrder


    res.status(200).json({ status: "SUCCESS", message: "Access Dashboard already!" })
})