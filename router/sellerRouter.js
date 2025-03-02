const express = require('express')
const { sellerRegister, sellerSignin, sellerMerchant, sellerAccount, sellerDashbord, sellerDashboard, getAllProducts, getMyProductsData, getProductImage, getMyProducts, sellerADDProduct, sellerUPDATEProduct, sellerDELETEProduct } = require('../controllers/sellerController')
const authorization = require('../middlewares/authorization')
const checkSeller = require('../middlewares/checkSeller')
const { addproductImage } = require('../controllers/imageController')
const sellerRouter = express.Router()

sellerRouter.get('/dashboard/:userID', authorization, checkSeller, sellerDashboard) //seller-center/dashboard


///// SELLER for Product :                 verify Token      role
sellerRouter.get('/products/all-products/:userID', authorization, checkSeller, getMyProducts)


sellerRouter.post('/products/add-product-images', authorization, checkSeller, addproductImage) //Cloudinary Storage : Keep Images
sellerRouter.post('/products/add-product', authorization, checkSeller, sellerADDProduct)


sellerRouter.patch('/products/update-product/:productID', authorization, checkSeller, sellerUPDATEProduct)
sellerRouter.delete('/products/delete-product/:productID', authorization, checkSeller, sellerDELETEProduct)


module.exports = sellerRouter




