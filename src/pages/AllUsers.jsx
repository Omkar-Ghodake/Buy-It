import React, { useState, useEffect, useContext } from 'react'
import Cookies from 'universal-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserContext } from '../../context/UserState'
import { RxCross2 } from 'react-icons/rx'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import UserEditModal from '../layouts/UserEditModal'
import swal from 'sweetalert'

const AllUsers = () => {
	const cookies = new Cookies()
	const navigate = useNavigate()

	const { userSession } = useContext(UserContext)

	const [isAdmin, setIsAdmin] = useState(false)
	const [redirectTime, setRedirectTime] = useState(3)
	const [allUsers, setAllUsers] = useState([])
	const [selectedUser, setSelectedUser] = useState(null)
	const [selectedUserInfo, setSelectedUserInfo] = useState(null)
	const [userEditModalOpen, setUserEditModalOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const verifyAdmin = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/user/verifyAdmin', {
				headers: {
					'Content-Type': 'application/json',
					'authToken': cookies.get('authToken')
				}
			})

			const data = await response.json()

			if (data.success) {
				setIsAdmin(true)
			} else {
				setIsAdmin(false)
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

	const fetchUsers = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/user/getAllUsers', {
				headers: {
					'Content-Type': 'application.json',
					'authToken': cookies.get('authToken')
				}
			})

			const data = await response.json()

			if (data.success) {
				setAllUsers(data.allUsers)
			} else {
				setAllUsers(null)
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

	const reduceRedirectTime = () => {
		setRedirectTime(redirectTime - 1)
	}

	const getSelectedUserInfo = (userId) => {
		setSelectedUser(userId)
		setSelectedUserInfo(allUsers.filter(user => user._id === userId)[0])
	}

	const deleteUser = async () => {
		try {
			const response = await fetch(`http://localhost:5000/api/user/deleteUser/${selectedUser}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'authToken': cookies.get('authToken')
				}
			})

			const data = response.json()

			if (data.success) {
				toast.warn('User deleted Successfully!', {
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

	const handleDeleteUser = async () => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this user data!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					deleteUser()
					fetchUsers()

					toast.warn('User Deleted Successfully!', {
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
					toast.warn('User not deleted!', {
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

	useEffect(() => {
		verifyAdmin()
		fetchUsers();
		!isAdmin && setTimeout(() => {
			reduceRedirectTime()
		}, 1000);

		redirectTime === 0 && navigate('/')
	}, [userSession, loading, redirectTime])


	return (
		<>
			{
				isAdmin
					? <div className='container mx-auto'>
						<h1 className='text-center text-3xl font-medium'>Users Information</h1>
						<div className='mb-5 flex justify-between'>
							<strong className=''>Total Users: { allUsers.length }</strong>
							<RxCross2 className={ `hover:bg-zinc-200 cursor-pointer p-1 text-3xl rounded-full duration-100 ${!selectedUser && 'invisible'}` } onClick={ () => { setSelectedUser(null) } } />
						</div>

						<div className="flex container mx-auto space-x-5">
							<div className="left flex flex-col space-y-2  min-h-[70vh] p-5 w-1/3 bg-white">
								{
									allUsers.length > 0 && allUsers.map((user, index) => {
										return (
											<div key={ index } className={ `px-7 py-3 cursor-pointer border border-zinc-300 hover:bg-blue-500 hover:text-white duration-100 ${selectedUser === user._id && 'bg-blue-500 text-white rounded'}` } onClick={ () => { getSelectedUserInfo(user._id) } }>
												<span>{ index + 1 }. { user._id }</span>
											</div>
										)
									})
								}
							</div>

							<div className="right flex flex-col min-h-[70vh] w-2/3 px-10 py-5 bg-white">
								{
									selectedUser
										? <div className='flex flex-col space-y-5'>
											<div className="group flex flex-col space-y-1">
												<b>Username</b>
												<span className='border border-zinc-300 py-1 px-3 w-2/3'>{ selectedUserInfo.username }</span>
											</div>

											<div className="group flex flex-col space-y-1">
												<b>Email</b>
												<span className='border border-zinc-300 py-1 px-3 w-2/3'>{ selectedUserInfo.email }</span>
											</div>

											<div className="group flex flex-col space-y-1">
												<b>Role</b>
												<span className='border border-zinc-300 py-1 px-3 w-2/3'>{ selectedUserInfo.role }</span>
											</div>

											<div className="group flex flex-col space-y-1">
												<b>isLoggedIn</b>
												<span className='border border-zinc-300 py-1 px-3 w-2/3'>{ selectedUserInfo.isLoggedIn ? 'YES' : 'NO' }</span>
											</div>

											<div className="group flex flex-col space-y-1">
												<b>Created At</b>
												<span className='border border-zinc-300 py-1 px-3 w-2/3'>{ selectedUserInfo.createdAt }</span>
											</div>

											<div className="group flex flex-col space-y-1">
												<b>Updated At</b>
												<span className='border border-zinc-300 py-1 px-3 w-2/3'>{ selectedUserInfo.updatedAt }</span>
											</div>

											<div className='flex justify-end items-center space-x-5'>
												<button className='flex justify-between items-center border border-amber-500 text-amber-500 hover:bg-amber-50 active:bg-white px-3 py-2 duration-150' onClick={ () => { setUserEditModalOpen(true) } }>
													Edit User <AiOutlineEdit className='mx-2' />
												</button>
												<button className='flex justify-between items-center border border-red-500 text-red-500 hover:bg-red-50 active:bg-white px-3 py-2 duration-150' onClick={ handleDeleteUser }>
													Delete User <AiOutlineDelete className='mx-2' />
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
				userEditModalOpen && <UserEditModal setUserEditModalOpen={ setUserEditModalOpen } selectedUser={ selectedUser } fetchUsers={ fetchUsers } setLoading={ setLoading } />
			}
		</>
	)
}

export default AllUsers