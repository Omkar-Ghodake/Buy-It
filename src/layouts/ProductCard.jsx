import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = (props) => {
	// const productId = 1234

	const { productId, title, desc, price } = props

	const handleAddToCart = async () => {

	}

	const handleBuyNow = async () => {

	}

	return (
		<div className="p-6 w-full md:w-[15vw] lg:w-[25vw] sm:mb-0 mb-6 rounded-lg">
			<div className='shadow-2xl rounded-lg group'>
				<Link to={ `/product/${productId}` } className="rounded-lg h-full overflow-hidden flex justify-center bg-white p-5">
					<img alt="content" className="object-cover object-center w-[70%] group-hover:scale-110 duration-150" src='https://rukminim1.flixcart.com/image/416/416/xif0q/mobile/l/8/r/-original-imaghxemnnnkd8bg.jpeg?q=70' />
				</Link>

				<div className='p-5 bg-white rounded-b-lg'>
					<Link to={ `/product:${productId}` } >
						<span className="text-xl font-medium title-font text-gray-900 hover:underline duration-150">{ title }</span>
					</Link>

					<div className='flex flex-col'>
						<span>Price</span>
						<span className='text-xl font-medium'>₹{ price }</span>
					</div>

					<p className="text-base leading-relaxed mt-2">{ desc }</p>

					<div className='flex justify-between items-center pt-5'>
						<button className='border border-zinc-300 px-4 py-2 rounded hover:shadow-md duration-150' onClick={ handleAddToCart }>
							Add To Cart
						</button>
						<button className='border border-zinc-300 px-4 py-2 rounded hover:shadow-md duration-150' onClick={ handleBuyNow }>
							Buy Now
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductCard