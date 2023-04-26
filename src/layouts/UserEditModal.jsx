import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'

const UserEditModal = ({ setUserEditModalOpen, selectedUser, fetchUsers, setLoading }) => {
	const cookies = new Cookies()

	const [userEditFormData, setUserEditFormData] = useState(null)

	const handleEditFormSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		try {
			const response = await fetch(`http://localhost:5000/api/user/updateUser/${selectedUser}`, {
				method: 'POST',
				body: JSON.stringify(userEditFormData),
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

				fetchUsers()
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

			setUserEditModalOpen(false)
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
		setUserEditFormData({ ...userEditFormData, [e.target.name]: e.target.value })
	}

	return (
		<>
			<div className='w-screen h-screen fixed top-0 blurBg flex justify-center items-center'>
				<div className='bg-white p-5 w-1/2 shadow-2xl rounded-lg'>
					<RxCross2 className='ml-auto p-1 text-3xl hover:bg-zinc-100 cursor-pointer duration-100 rounded-full' onClick={ () => { setUserEditModalOpen(false) } } />
					<form className='flex flex-col space-y-5 mx-7 my-10' onSubmit={ handleEditFormSubmit }>
						<div className="input-group rounded relative">
							<label htmlFor="username" className='absolute -top-3 left-3 bg-white px-[7px]'>Username</label>
							<input type="text" id='username' name='username' className='outline-none border border-zinc-300 focus:border-indigo-500 p-3 rounded duration-150 w-full' onChange={ handleOnChange } />
						</div>

						<div className="input-group rounded relative">
							<label htmlFor="email" className='absolute -top-3 left-3 bg-white px-[7px]'>Email</label>
							<input type="text" id='email' name='email' className='outline-none border border-zinc-300 focus:border-indigo-500 p-3 rounded duration-150 w-full' onChange={ handleOnChange } />
						</div>

						<div className="input-group rounded relative">
							<label htmlFor="role" className='absolute -top-3 left-3 bg-white px-[7px]'>Role</label>
							<input type="text" id='role' name='role' className='outline-none border border-zinc-300 focus:border-indigo-500 p-3 rounded duration-150 w-full' onChange={ handleOnChange } />
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

export default UserEditModal