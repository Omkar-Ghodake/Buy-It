const router = require('express').Router()
const { body } = require('express-validator')
const {
	registerUser, userLogin, userLogout
} = require('../controllers/authController')
const verifyLoginSession = require('../middlewares/verifyLoginSession')

// register a user
router.post(
	'/registerUser',
	[
		body('username', 'Username should not be less than 3 characters').isLength({ min: 3 }),
		body('email', 'Invalid Email').isEmail(),
		body('password', 'Password should not be less than 8 characters').isLength({ min: 8 }),
	],
	registerUser
)

// user login
router.post(
	'/login',
	[
		body('password', "Password should not be less than 8 characters").isLength({ min: 8 })
	],
	userLogin
)

// user logout
router.get(
	'/logout',
	verifyLoginSession,
	userLogout
)

module.exports = router