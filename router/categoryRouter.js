

const express = require('express')
const { addCategory, getAllCategories } = require('../controllers/categoryController')
const authorization = require('../middlewares/authorization')
const categoryRouter = express.Router()

categoryRouter.post('/add-category', authorization, addCategory)
categoryRouter.get('/all-categories', authorization, getAllCategories)


module.exports = categoryRouter