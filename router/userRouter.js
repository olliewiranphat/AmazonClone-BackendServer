const express = require('express')
const userRouter = express.Router()
const { userRegister, userSignin, userAccount, userOrderHistory, userCart, userUpdate, deleteUser } = require('../controllers/userController')
const authorization = require('../middlewares/authorization')

///// DONT USE THESE NOW : GOT USER DATA FROM CLERK
userRouter.post('/register', userRegister)
userRouter.post('/signin', userSignin)


///// when USER got Token : will go to another path
//// USER DATA, TOKEN FROM CLERK : IF NO CLERKID in DB --> Create, IF HAVE CLERKID --> Upaate UserDATA in DB 
userRouter.put('/update-account', authorization, userUpdate)
userRouter.delete('/delete-account', authorization, deleteUser)
userRouter.get('/order-history', authorization, userOrderHistory)
userRouter.get('/cart', authorization, userCart)






module.exports = userRouter