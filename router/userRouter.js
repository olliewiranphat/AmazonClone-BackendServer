const express = require('express')
const userRouter = express.Router()
const { userRegister, userSignin, userOrderHistory, userCart, deleteUser, userCreateUpdateDB, userUpdateImageAccount } = require('../controllers/userController')
const authorization = require('../middlewares/authorization')
const { searchProducts, addPDCart, orderPayment } = require('../controllers/productController')
const { addImageCloud } = require('../controllers/imageController')

///// User SEARCH Product:
userRouter.get('/search-products', searchProducts)
userRouter.post('/product-detail/add-to-cart', addPDCart)
userRouter.post('/product-detail/order/payment', orderPayment)


///// DONT USE THESE NOW : GOT USER DATA FROM CLERK
userRouter.post('/register', userRegister)
userRouter.post('/signin', userSignin)


///// when USER got Token : will go to another path
//// USER DATA, TOKEN FROM CLERK : IF NO CLERKID in DB --> Create, IF HAVE CLERKID --> Upaate UserDATA in DB 
userRouter.put('/update-account', authorization, userCreateUpdateDB)
userRouter.post('/add-images-cloud', authorization, addImageCloud) //Cloudinary Storage : Keep Images
userRouter.delete('/delete-account', authorization, deleteUser)
userRouter.get('/order-history', authorization, userOrderHistory)
userRouter.get('/cart', authorization, userCart)









module.exports = userRouter