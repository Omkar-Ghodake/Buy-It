import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'

const AddProducts = () => {
	const cookies = new Cookies()

	const [productForm, setProductForm] = useState(null)

	const handleFormSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await fetch('http://localhost:5000/api/products/createProduct', {
				method: 'POST',
				body: JSON.stringify(productForm),
				headers: {
					'Content-Type': 'application/json',
					'authToken': cookies.get('authToken')
				}
			})

			const data = await response.json()

			if (data.success) {
				setProductForm(null)

				toast.success('Product Created Successfully!', {
					position: "top-left",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				})

				e.target.reset()
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

	const handleOnChange = (e) => {
		setProductForm({ ...productForm, [e.target.name]: e.target.value })
	}

	return (
		<div className='container mx-auto p-5 flex justify-center relative items-center flex-col min-h-[70vh]'>
			<form className='bg-white w-1/2 p-5 rounded-lg shadow-lg flex flex-col justify-between min-h-[70vh]' onSubmit={ handleFormSubmit }>
				<div className="input-group flex flex-col justify-center relative">
					<label htmlFor="title" className='absolute -top-3 left-[11px] bg-white px-1'>Title</label>
					<input type="text" id='title' name='title' className='outline-none px-3 py-2 border border-zinc-300 rounded' onChange={ handleOnChange } />
				</div>

				<div className="input-group flex flex-col justify-center relative">
					<label htmlFor="desc" className='absolute -top-3 left-[11px] bg-white px-1'>Descriptiom</label>
					<input type="text" id='desc' name='desc' className='outline-none px-3 py-2 border border-zinc-300 rounded' onChange={ handleOnChange } />
				</div>

				{/* <div className="input-group flex flex-col justify-center relative">
					<label htmlFor="image" className='absolute -top-3 left-[11px] bg-white px-1'>Image</label>
					<input type="text" id='image' name='image' className='outline-none px-3 py-2 border border-zinc-300 rounded' onChange={ handleOnChange } />
				</div> */}

				<div className="input-group flex flex-col justify-center relative">
					<label htmlFor="categories" className='absolute -top-3 left-[11px] bg-white px-1'>Categories</label>
					<input type="text" id='categories' name='categories' className='outline-none px-3 py-2 border border-zinc-300 rounded' onChange={ handleOnChange } />
				</div>

				<div className="input-group flex flex-col justify-center relative">
					<label htmlFor="price" className='absolute -top-3 left-[11px] bg-white px-1'>Price</label>
					<input type="text" id='price' name='price' className='outline-none px-3 py-2 border border-zinc-300 rounded' onChange={ handleOnChange } />
				</div>

				<div className="input-group flex flex-col justify-center relative">
					<label htmlFor="stock" className='absolute -top-3 left-[11px] bg-white px-1'>Stock</label>
					<input type="text" id='stock' name='stock' className='outline-none px-3 py-2 border border-zinc-300 rounded' onChange={ handleOnChange } />
				</div>

				<button className='border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50 active:bg-white w-fit mx-auto  px-5 py-1 duration-150 rounded' role={ 'submit' }>
					SUBMIT
				</button>
			</form>
		</div>
	)
}

export default AddProducts