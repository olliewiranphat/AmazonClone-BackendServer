const express = require('express')
const adminRouter = express.Router()
const authorization = require('../middlewares/authorization')

adminRouter.post('/signin-role', authorization,) // Update Role ADMIN, Generate Token
// adminRouter.patch('/update-role') ???
// adminRouter.get('/dashboard',authorization)
// adminRouter.get('management', authorization)





module.exports = adminRouter