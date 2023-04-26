const jwt = require('jsonwebtoken')

const generateJWT = async (res, user, tokenExpiry) => {
	const payload = {
		id: user.id,
		role: user.role
	}

	const cookieOptions = {
		expires: new Date(
			Date.now() + (600000 * 144)
		),
		httpOnly: true
	}

	const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: tokenExpiry })
	return res.json({ success: true, username: user.username, authToken })
}

module.exports = generateJWT