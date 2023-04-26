const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		products: [
			{
				productId: {
					type: Schema.Types.ObjectId,
					ref: 'Product'
				},
				quantity: {
					type: Number,
					default: 1
				}
			}
		]
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Cart', CartSchema)