const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectToMongo = require('./db')

// connect to db
connectToMongo()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// api endpoints
app.use('/api/user', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/product'))

if (process.env.PORT) {
	app.listen(process.env.PORT, () => {
		console.log(`Server running at http://127.0.0.1:${process.env.PORT}`)
	})
}

module.exports = app