import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ProductContext = createContext()

const ProductsState = (props) => {
	const [allProducts, setAllProducts] = useState([])

	const fetchAllProducts = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/products/allProducts', {
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const data = await response.json()

			if (data.success) {
				setAllProducts(data.products)
			} else {
				toast.error(data.error, {
					position: "top-left",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				})

				console.error(data)
			}
		} catch (error) {
			toast.error(error, {
				position: "top-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			})

			console.error(error)
		}
	}

	useEffect(() => {
		fetchAllProducts()
	}, [])

	return (
		<ProductContext.Provider value={ { allProducts, fetchAllProducts } }>
			{ props.children }
		</ProductContext.Provider>
	)
}

export {
	ProductContext,
	ProductsState
} 