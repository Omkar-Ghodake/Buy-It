const { validationResult } = require('express-validator')
require('dotenv').config()
const CryptoJS = require('crypto-js')
const User = require('../models/User')
const Cart = require('../models/Cart')
const generateJWT = require('../utils/generateJWT')


exports.registerUser = async (req, res) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).json({ success: false, error: validationErrors })
	}

	try {
		const { username, email, password } = req.body

		const existingUsername = await User.findOne({ username })
		if (existingUsername) {
			return res.status(409).json({ success: false, error: 'Username already taken!' })
		}

		const existingEmail = await User.findOne({ email })
		if (existingEmail) {
			return res.status(409).json({ success: false, error: 'Email already exists!' })
		}

		const encryptedPass = CryptoJS.AES.encrypt(password, process.env.CRYPTOJS_SECRET).toString()

		const newUser = await User.create({ username, email, password: encryptedPass })

		const cart = await Cart.create({ userId: newUser.id })

		res.status(201).json({ success: true, newUser, cart })
	} catch (error) {
		return res.status(500).json({ success: false, error, message: 'An Internal Error Occured' })
	}
}

exports.userLogin = async (req, res) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).json({ success: false, error: validationErrors })
	}

	try {
		const { email, password } = req.body

		let existingUser

		// if (username) {
		existingUser = await User.findOne({ username: email })
		if (!existingUser) {
			existingUser = await User.findOne({ email })
		}

		if (!existingUser) {
			return res.status(400).json({ success: false, error: 'No such User exists!' })
		}

		const decryptedPass = CryptoJS.AES.decrypt(existingUser.password, process.env.CRYPTOJS_SECRET).toString(CryptoJS.enc.Utf8)

		if (password !== decryptedPass) {
			return res.status(401).json({ success: false, error: 'Invalid Credentials!' })
		}

		if (existingUser.isLoggedIn) {
			return res.json({ success: false, error: 'User already logged in from another device. Please logout and try again' })
		}

		existingUser.isLoggedIn = true
		await existingUser.save()

		await generateJWT(res, existingUser, '7d')
	} catch (error) {
		return res.status(500).json({ success: false, error, message: 'An Internal Error Occured' })
	}
}

// user logout
exports.userLogout = async (req, res) => {
	try {
		await User.findByIdAndUpdate(req.user.id, { isLoggedIn: false }, { new: true })

		res.json({ success: true, message: 'Logged Out', user: req.user })
	} catch (error) {
		res.status(500).json({ success: false, error })
	}
}