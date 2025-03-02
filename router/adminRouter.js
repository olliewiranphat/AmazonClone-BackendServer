const express = require('express')
const adminRouter = express.Router()
const authorization = require('../middlewares/authorization')
const { getADMINData, getAllProductsDB, adminRegister, updateRole, updateAccount, getDashboord } = require('../controllers/adminController')
const checkADMIN = require('../middlewares/checkADMIN')
const { getAllCategories, addCategory, updateCategory, deleteCategory } = require('../controllers/categoryController')

///// ADMIN Register in normal and hashPassword by Bcryptjs 
adminRouter.patch('/update-account', authorization, updateAccount) //UserAccount Form, ROLE: ADMIN
///// CheckADMIN ??? :
adminRouter.get('/dashboard', authorization, checkADMIN, getDashboord)
adminRouter.get('/management/all-products', getAllProductsDB)

adminRouter.get('/management/all-categories', getAllCategories)
adminRouter.post('/management/all-categories/add-category', addCategory)
adminRouter.patch('/management/all-categories/update-category', updateCategory)
adminRouter.delete('/management/all-categories/delete-category/:categoryID', deleteCategory)




module.exports = adminRouter