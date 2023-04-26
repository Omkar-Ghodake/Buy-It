import React, { useState, useEffect, useContext } from 'react'
import Cookies from 'universal-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserContext } from '../../context/UserState'
import { FaUserAlt } from 'react-icons/fa'
import { AiOutlineShop } from 'react-icons/ai'
import AllProductsDash from './AllProductsDash'

const StaffDashboard = () => {
	const cookies = new Cookies()
	const navigate = useNavigate()

	const { userSession } = useContext(UserContext)

	const [isAuthorised, setIsAuthorised] = useState(false)
	const [redirectTime, setRedirectTime] = useState(3)

	const verifyAdmin = async () => {
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

	const reduceRedirectTime = () => {
		setRedirectTime(redirectTime - 1)
	}

	useEffect(() => {
		verifyAdmin()
	}, [])

	useEffect(() => {
		(!userSession && !isAuthorised) && setTimeout(() => {
			reduceRedirectTime()
		}, 1000)

		redirectTime === 0 && navigate('/')
	}, [redirectTime, userSession])

	return (
		<>
			{
				isAuthorised
					? <div className='w-screen'>
						<h1 className='text-center font-medium text-3xl'>STAFF DASHBOARD</h1>

						<div className="dashboard flex flex-wrap space-x-5 container mx-auto bg-white w-full min-h-[70vh] my-5 p-5 rounded-lg shadow-lg">
							<Link to={ '/allProductsDash' } className="card flex flex-col justify-center items-center w-[15%] space-y-4 shadow-lg border p-5 hover:scale-110 hover:shadow-2xl duration-150 h-fit">
								<AiOutlineShop className='text-6xl' />
								<span>See All Products</span>
							</Link>

							<Link to={ '/addProducts' } className="card flex flex-col justify-center items-center w-[15%] space-y-4 shadow-lg border p-5 hover:scale-110 hover:shadow-2xl duration-150 h-fit">
								<AiOutlineShop className='text-6xl' />
								<span>Add Products</span>
							</Link>
						</div>
					</div>
					: <div className="min-h-[80vh] flex flex-col space-y-5 justify-center items-center">
						<h1 className='text-3xl text-red-500'>401 Unauthorised Access!</h1>
						<p className='text-xl'>
							Redirecting to <Link to={ '/' } className='underline'>Home</Link> in { redirectTime } seconds
						</p>
					</div>
			}
		</>
	)
}

export default StaffDashboard