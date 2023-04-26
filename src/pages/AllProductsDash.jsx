import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserState'
import { ProductContext } from '../../context/ProductsState'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'
import ProductEditModal from '../layouts/ProductEditModal'

const AllProductsDash = () => {
	const cookies = new Cookies()
	const navigate = useNavigate()

	const { userSession } = useContext(UserContext)
	const { allProducts, fetchAllProducts } = useContext(ProductContext)

	const [isAuthorised, setIsAuthorised] = useState(false)
	const [redirectTime, setRedirectTime] = useState(3)
	const [selectedProduct, setSelectedProduct] = useState(null)
	const [selectedProductInfo, setselectedProductInfo] = useState(null)
	const [productEditModalOpen, setProductEditModalOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const checkIsAuthorised = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/user/verifyStaff', {
				headers: {
					'Content-Type': 'application/json',
					'authToken': cookies.get('authToken')
				}
			})

			const data = await response.json()

			if (data.success) {
				setIsAuthorised(true)
			} else {
				setIsAuthorised(false)
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
		}
	}

	const getSelectedProductInfo = (productId) => {
		setSelectedProduct(productId)
		setselectedProductInfo(allProducts.filter(product => product._id === productId)[0])
	}

	const deleteProduct = async () => {
		try {
			const response = await fetch(`http://localhost:5000/api/products/deleteProduct/${selectedProduct}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'authToken': cookies.get('authToken')
				}
			})

			const data = response.json()

			if (data.success) {
				toast.warn('Product deleted Successfully!', {
					position: "top-left",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				})
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
		}
	}

	const handleDeleteProduct = async () => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this product data!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					deleteProduct()
					fetchAllProducts()

					toast.warn('Product Deleted Successfully!', {
						position: "top-left",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					})
				} else {
					toast.warn('Product not deleted!', {
						position: "top-left",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					})
				}
			})
	}

	const reduceRedirectTime = () => {
		setRedirectTime(redirectTime - 1)
	}

	useEffect(() => {
		checkIsAuthorised();

		(!userSession && !isAuthorised) && setTimeout(() => {
			reduceRedirectTime()
		}, 1000)

		redirectTime === 0 && navigate('/')
	}, [redirectTime, userSession])

	return (
		<>
			{
				isAuthorised
					? <div className='container mx-auto'>
						<h1 className='text-center text-3xl font-medium'>Users Information</h1>
						<div className='mb-5 flex justify-between'>
							<strong className=''>Total Products: { allProducts.length }</strong>
							<RxCross2 className={ `hover:bg-zinc-200 cursor-pointer p-1 text-3xl rounded-full duration-100 ${!selectedProduct && 'invisible'}` } onClick={ () => { setSelectedProduct(null) } } />
						</div>

						<div className="flex container mx-auto space-x-5">
							<div className="left flex flex-col space-y-2  min-h-[70vh] p-5 w-1/3 bg-white">
								{
									allProducts.length > 0 && allProducts.map((product, index) => {
										return (
											<div key={ index } className={ `px-7 py-3 cursor-pointer border border-zinc-300 hover:bg-blue-500 hover:text-white duration-100 ${selectedProduct === product._id && 'bg-blue-500 text-white rounded'}` } onClick={ () => { getSelectedProductInfo(product._id) } }>
												<span>{ index + 1 }. { product._id }</span>
											</div>
										)
									})
								}
							</div>

							<div className="right flex flex-col min-h-[70vh] w-2/3 px-10 py-5 bg-white">
								{
									selectedProduct
										? <div className='flex flex-col space-y-5'>
											<div className="group flex flex-col space-y-1">
												<b>Title</b>
												<span className='border border-zinc-300 py-1 px-3 w-2/3'>{ selectedProductInfo.title }</span>
											</div>

											<div className="group flex flex-col space-y-1">
												<b>Description</b>
												<span className='border border-zinc-300 py-1 px-3 w-2/3'>{ selectedProductInfo.desc }</span>
											</div>

											<div className="group flex flex-col space-y-1">
												<b>Price</b>
												<span className='border border-zinc-300 py-1 px-3 w-2/3'>&#8377;{ selectedProductInfo.price }</span>
											</div>

											<div className="group flex flex-col space-y-1">
												<b>Categories Included</b>
												<span className='border border-zinc-300 py-1 px-3 w-2/3'>{ selectedProductInfo.categories }</span>
											</div>

											<div className="group flex flex-col space-y-1">
												<b>Stock</b>
												<span className='border border-zinc-300 py-1 px-3 w-2/3'>{ selectedProductInfo.stock }</span>
											</div>

											<div className="group flex flex-col space-y-1">
												<b>Ratings</b>
												<span className='border border-zinc-300 py-1 px-3 w-2/3'>{ selectedProductInfo.ratings }</span>
											</div>

											<div className="group flex flex-col space-y-1">
												<b>Created At</b>
												<span className='border border-zinc-300 py-1 px-3 w-2/3'>{ selectedProductInfo.createdAt }</span>
											</div>

											<div className="group flex flex-col space-y-1">
												<b>Updated At</b>
												<span className='border border-zinc-300 py-1 px-3 w-2/3'>{ selectedProductInfo.updatedAt }</span>
											</div>

											<div className='flex justify-end items-center space-x-5'>
												<button className='flex justify-between items-center border border-amber-500 text-amber-500 hover:bg-amber-50 active:bg-white px-3 py-2 duration-150' onClick={ () => { setProductEditModalOpen(true) } }>
													Edit Product <AiOutlineEdit className='mx-2' />
												</button>
												<button className='flex justify-between items-center border border-red-500 text-red-500 hover:bg-red-50 active:bg-white px-3 py-2 duration-150' onClick={ handleDeleteProduct }>
													Delete Product <AiOutlineDelete className='mx-2' />
												</button>
											</div>
										</div>
										: <p className='text-center text-2xl'>Select User to see Information</p>
								}
							</div>
						</div>
					</div>
					: <div className="min-h-[80vh] flex flex-col space-y-5 justify-center items-center">
						<h1 className='text-3xl text-red-500'>401 Unauthorised Access!</h1>
						<p className='text-xl'>
							Redirecting to <Link to={ '/' } className='underline'>Home</Link> in { redirectTime } seconds
						</p>
					</div>
			}

			{
				productEditModalOpen && < ProductEditModal setProductEditModalOpen={ setProductEditModalOpen } selectedProduct={ selectedProduct } fetchAllProducts={ fetchAllProducts } setLoading={ setLoading } />
			}
		</>
	)
}

export default AllProductsDash