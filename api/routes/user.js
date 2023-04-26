const { getUserData, changeRole, getAllUsers, updateUser, deleteUser } = require('../controllers/userController')
const verifyLoginSession = require('../middlewares/verifyLoginSession')
const verifyAdmin = require('../middlewares/verifyAdmin')
const verifyStaff = require('../middlewares/verifyStaff')
const { body, param } = require('express-validator')

const router = require('express').Router()

// get user data
router.get('/getUser', verifyLoginSession, getUserData)

router.get('/getAllUsers', verifyAdmin, getAllUsers)

// update isAdmin --admin
router.post('/changeRole',
	[
		body('userId', 'User ID required').exists(),
		body('role', 'Role required').exists()
	],
	verifyAdmin,
	changeRole
)

router.get('/verifyAdmin', verifyAdmin, (req, res) => {
	try {
		res.json({ success: true })
	} catch (error) {
		return res.status(500).json({ success: false, error, message: 'An Internal Error Occured' })
	}
})

router.get('/verifyStaff', verifyStaff, (req, res) => {
	try {
		res.json({ success: true })
	} catch (error) {
		return res.status(500).json({ success: false, error, message: 'An Internal Error Occured' })
	}
})

router.post('/updateUser/:id', [
	param('id', 'User Id not Found').exists()
], verifyAdmin, updateUser)

router.delete('/deleteUser/:id', [
	param('id', 'User Id not Found').exists()
], verifyAdmin, deleteUser)

module.exports = router