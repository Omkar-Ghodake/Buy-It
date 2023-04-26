import React, { useContext } from 'react'
import ProductCard from '../layouts/ProductCard'
import { ProductContext } from '../../context/ProductsState'

const Products = () => {
	const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

	const { allProducts } = useContext(ProductContext)

	return (
		<>
			<div className='container mx-auto flex flex-wrap justify-between'>
				{
					allProducts.length > 0 && allProducts.map((product, index) => {
						return (
							<ProductCard key={ index }
								productId={ product._id }
								title={ product.title }
								desc={ product.desc }
								price={ product.price }
							/>
						)
					})
				}
			</div>
		</>
	)
}

export default Products