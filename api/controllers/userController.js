const User = require('../models/User')
const { validationResult } = require('express-validator')

// get user data
exports.getUserData = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password')
		if (!user) {
			return res.status(404).json({ success: false, error: 'User not Found' })
		}
		res.json({ success: true, user })
	} catch (error) {
		return res.status(500).json({ success: false, error, message: 'An Internal Error Occured' })
	}
}

exports.getAllUsers = async (req, res) => {
	try {
		const allUsers = await User.find()

		res.json({ success: true, allUsers })
	} catch (error) {
		return res.status(500).json({ success: false, error, message: 'An Internal Error Occured' })
	}
}

exports.changeRole = async (req, res) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).json({ success: false, error: validationErrors })
	}

	try {
		const { userId, role } = req.body

		const user = await User.findById(userId)

		if (!user) {
			return res.status(404).json({ success: false, error: 'User not Found' })
		}

		const loggedInUser = await User.findById(req.user.id)

		if (loggedInUser.role !== 'Admin') {
			return res.status(401).json({ success: false, error: 'Unauthorised Access!' })
		}

		user.role = role
		await user.save()

		res.json({ success: true, user })
	} catch (error) {
		return res.status(500).json({ success: false, error, message: 'An Internal Error Occured' })
	}
}

exports.updateUser = async (req, res) => {
	try {
		const { id } = req.params

		const user = await User.findById(id)

		if (!user) {
			return res.status(404).json({ success: false, error: 'User Not Found!' })
		}

		const updatedUser = await User.findByIdAndUpdate(id, {
			$set: req.body
		}, { new: true })

		res.json({ success: true, updatedUser })
	} catch (error) {
		return res.status(500).json({ success: false, error, message: 'An Internal Error Occured' })
	}
}

exports.deleteUser = async (req, res) => {
	try {
		const { id } = req.params

		const user = await User.findById(id)

		if (!user) {
			return res.status(404).json({ success: false, error: 'User Not Found!' })
		}

		await User.findByIdAndDelete(id)

		res.json({ success: true })
	} catch (error) {
		return res.status(500).json({ success: false, error, message: 'An Internal Error Occured' })
	}
}