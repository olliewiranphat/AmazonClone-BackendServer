const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8080
const NotFound = require('./middlewares/NotFound')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
const morgan = require('morgan')

const userRouter = require('./router/userRouter')
const sellerRouter = require('./router/sellerRouter')
const adminRouter = require('./router/adminRouter')
const categoryRouter = require('./router/categoryRouter')
const { clerkMiddleware } = require('@clerk/express')
const productRouter = require('./router/productRouter')

///// Middlewares :
app.use(clerkMiddleware()) //req.auth
///// Connect Frontend - Backend :
app.use(cors({ origin: 'http://localhost:5173' }))
///// Read JSON req.body from Frontend :
app.use(express.json({ limit: "10mb" }))
app.use(morgan('dev'))

///// Router : 
app.use('/user', userRouter)
app.use('/seller-center', sellerRouter)



app.use('/admin', adminRouter)
app.use('/category', categoryRouter)


///// Not Found Path :
app.use(NotFound)

///// error from path and router
app.use(errorHandler)


app.listen(port, () => console.log(`Server is running on PORT ${port}`))