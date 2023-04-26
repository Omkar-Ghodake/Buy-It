const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const verifyStaff = require('../middlewares/verifyStaff')
const {
	createProduct, updateProduct, deleteProduct, getAllProducts, getSpecificProductDetails
} = require('../controllers/productController')

// create a product --admin
router.post('/createProduct',
	verifyStaff,
	[
		body('title').exists(),
		body('desc').exists(),
		// body('images').exists(),
		body('categories', 'Category cannot be empty').exists(),
		body('price', 'Price Should be a number').isNumeric(),
		body('stock').isNumeric(),
	],
	createProduct
)

// update a product --admin
router.post('/updateProduct/:id', verifyStaff, updateProduct)

// delete a product --admin
router.delete('/deleteProduct/:id', verifyStaff, deleteProduct)

// get all products
router.get('/allProducts', getAllProducts)

// get specific product details
router.get('/:productId', getSpecificProductDetails)

module.exports = router