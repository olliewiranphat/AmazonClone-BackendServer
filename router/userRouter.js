const express = require('express')
const userRouter = express.Router()
const { userRegister, userSignin, userOrderHistory, userCart, deleteUser, userCreateUpdateDB, ADDtoCart, userMyAccount, OrderProducts, updateQuantity, paymentCheckout, paymentStatus, updateImageAccount } = require('../controllers/userController')
const authorization = require('../middlewares/authorization')
const { searchProducts, orderPayment } = require('../controllers/productController')
const { addImageCloud } = require('../controllers/imageController')

///// User SEARCH Product:
userRouter.get('/search-products', searchProducts)
userRouter.post('/product-detail/order/payment', orderPayment)


///// DONT USE THESE NOW : GOT USER DATA FROM CLERK!!
userRouter.post('/register', userRegister)
userRouter.post('/signin', userSignin)


///// when USER got Token from CLERK : will go to another path
//// USER DATA, TOKEN FROM CLERK : IF NO CLERKID in DB --> Create, IF HAVE CLERKID --> Update UserDATA in DB 
userRouter.get('/my-account', authorization, userMyAccount)
userRouter.put('/update-account', authorization, userCreateUpdateDB) //Create/Update in DB
userRouter.patch('/update-image-account', authorization, updateImageAccount) //Update imageUrl in DB
userRouter.post('/add-images-cloud', authorization, addImageCloud) //Cloudinary Storage : Keep Images
userRouter.delete('/delete-account', authorization, deleteUser)
userRouter.post('/add-to-cart/:userID', authorization, ADDtoCart)
userRouter.get('/cart/:userID', authorization, userCart)
userRouter.post('/cart/update-quantity/:userID', authorization, updateQuantity)


///// Payment: 
userRouter.post("/payment/checkout", authorization, paymentCheckout)
userRouter.get("/payment-status/:session/:userID", authorization, paymentStatus)






module.exports = userRouter