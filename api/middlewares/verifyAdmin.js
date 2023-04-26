const jwt = require('jsonwebtoken')

const verifyAdmin = async (req, res, next) => {
	try {
		const { authtoken } = req.headers

		if (!authtoken) {
			return res.status(401).json({ success: false, error: 'Please Authenticate using valid token' })
		}

		const data = jwt.verify(authtoken, process.env.JWT_SECRET)

		if (!(data.role === 'Admin')) {
			return res.status(401).json({ success: false, error: 'Unauthorized Access!' })
		}
		req.user = data
		next()
	} catch (error) {
		res.status(500).json({ success: false, error })
	}
}

module.exports = verifyAdmin