import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'

const ProductEditModal = ({ setProductEditModalOpen, selectedProduct, fetchAllProducts, setLoading }) => {
	const cookies = new Cookies()

	const [productEditFormData, setProductEditFormData] = useState(null)

	const handleEditFormSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		try {
			const response = await fetch(`http://localhost:5000/api/products/updateProduct/${selectedProduct}`, {
				method: 'POST',
				body: JSON.stringify({ ...productEditFormData, categories: productEditFormData.categories.split(",") }),
				headers: {
					'Content-Type': 'application/json',
					'authToken': cookies.get('authToken')
				}
			})

			const data = await response.json()

			if (data.success) {
				toast.success('User Updated Successfully!', {
					position: "top-left",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				})

				fetchAllProducts()
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

			setProductEditModalOpen(false)
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

		setLoading(false)
	}

	const handleOnChange = (e) => {
		setProductEditFormData({ ...productEditFormData, [e.target.name]: e.target.value })
	}

	return (
		<>
			<div className='w-screen h-screen fixed top-0 blurBg flex justify-center items-center'>
				<div className='bg-white p-5 w-1/2 shadow-2xl rounded-lg'>
					<RxCross2 className='ml-auto p-1 text-3xl hover:bg-zinc-100 cursor-pointer duration-100 rounded-full' onClick={ () => { setProductEditModalOpen(false) } } />
					<form className='flex flex-col space-y-5 mx-7 my-10' onSubmit={ handleEditFormSubmit }>
						<div className="input-group rounded relative">
							<label htmlFor="title" className='absolute -top-3 left-3 bg-white px-[7px]'>Title</label>
							<input type="text" id='title' name='title' className='outline-none border border-zinc-300 focus:border-indigo-500 p-3 rounded duration-150 w-full' onChange={ handleOnChange } />
						</div>

						<div className="input-group rounded relative">
							<label htmlFor="price" className='absolute -top-3 left-3 bg-white px-[7px]'>Price</label>
							<input type="text" id='price' name='price' className='outline-none border border-zinc-300 focus:border-indigo-500 p-3 rounded duration-150 w-full' onChange={ handleOnChange } />
						</div>

						<div className="input-group rounded relative">
							<label htmlFor="desc" className='absolute -top-3 left-3 bg-white px-[7px]'>Description</label>
							<input type="text" id='desc' name='desc' className='outline-none border border-zinc-300 focus:border-indigo-500 p-3 rounded duration-150 w-full' onChange={ handleOnChange } />
						</div>

						<div className="input-group rounded relative">
							<label htmlFor="categories" className='absolute -top-3 left-3 bg-white px-[7px]'>Categories</label>
							<input type="text" id='categories' name='categories' className='outline-none border border-zinc-300 focus:border-indigo-500 p-3 rounded duration-150 w-full' onChange={ handleOnChange } />
						</div>

						<button className='flex justify-between items-center border border-indigo-500 text-indigo-500 hover:bg-indigo-50 active:bg-white px-3 py-2 duration-150 w-fit ml-auto' role={ 'submit' }>
							Submit
						</button>

						{/* <button className='flex justify-between items-center border border-red-500 text-red-500 hover:bg-red-50 active:bg-white px-3 py-2 duration-150 w-fit ml-auto' onClick={ () => { swal.close() } }>
						Cancel
					</button> */}
					</form>
				</div>
			</div>
		</>
	)
}

export default ProductEditModal