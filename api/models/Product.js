const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		desc: {
			type: String,
			required: true
		},
		image: {
			type: String,
			require: true
		},
		categories: {
			type: Array,
			required: true
		},
		price: {
			type: Number,
			required: true
		},
		stock: {
			type: Number,
			required: true,
			default: 1,
			min: 1
		},
		ratings: {
			type: Number,
			default: 0
		},
		numOfReviews: {
			type: Number,
			default: 0
		},
		reviews: [
			{
				user: {
					type: Schema.Types.ObjectId,
					ref: 'User',
					required: true
				},
				name: {
					type: String,
					required: true
				},
				rating: {
					type: Number,
					required: true
				},
				comment: {
					type: String
				}
			}
		]
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)