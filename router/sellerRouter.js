const express = require('express')
const { sellerRegister, sellerSignin, sellerMerchant, sellerAccount, sellerProduct, sellerDashbord, sellerDashboard } = require('../controllers/sellerController')
const authorization = require('../middlewares/authorization')
const checkSeller = require('../middlewares/checkSeller')
const { addproductImage } = require('../controllers/imageController')
const sellerRouter = express.Router()

// sellerRouter.post('/register', authorization, sellerRegister) //Must be User first so can Register Seller
// sellerRouter.post('/signin', sellerSignin) //if have Registered, generate SellerToken, Just Send email/phone for Signin 

///// After Login : Authorized SellerToken before into these pathes
/// From authorization : will get sellerData from req.user ***
// sellerRouter.get('/account', authorization, sellerAccount)
sellerRouter.post('/merchant/all-products', authorization, checkSeller, sellerMerchant)//send userID to get All products in DB
sellerRouter.get('/dashboard', authorization, sellerDashboard)
///// SELLER for Product :
sellerRouter.post('/add-product', authorization, checkSeller, sellerProduct)
sellerRouter.post('/add-product-images', authorization, checkSeller, addproductImage) //Cloudinary Storage : Keep Images
sellerRouter.get('/all-products', authorization, checkSeller)
sellerRouter.patch('/update-products', authorization, checkSeller)
sellerRouter.delete('/delete-products', authorization, checkSeller)








module.exports = sellerRouter




