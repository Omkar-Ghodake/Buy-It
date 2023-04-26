import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserState'
import Cookies from 'universal-cookie'
import { BsChevronCompactDown } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { CiShop } from 'react-icons/ci'

const Navbar = () => {
	const cookies = new Cookies()
	const location = useLocation()
	const navigate = useNavigate()

	const { userSession, setUserSession, getUserInfo } = useContext(UserContext)

	const [dropdown, setDropdown] = useState(false)

	const toggleDropdown = () => {
		dropdown
			? setDropdown(false)
			: setDropdown(true)
	}

	const handleLogout = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/auth/logout', {
				headers: {
					'Content-Type': 'application/json',
					'authToken': cookies.get('authToken')
				}
			})

			const data = await response.json()

			if (data.success) {
				setTimeout(() => {
					cookies.remove('authToken')
				}, 2000);

				toast.success(`Logged Out Successfully!`, {
					position: "top-left",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				})

				setUserSession(null)

				navigate('/')
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
		setDropdown(false)
		cookies.get('authToken') && getUserInfo()
	}, [cookies.get('authToken'), location.pathname])

	return (
		<nav className='navbar flex border-b-2 justify-between items-center px-10 py-4'>
			<div className="navbarBrand flex justify-between items-center">
				<CiShop className='text-6xl' />
				<Link to={ '/' }><h1 className='text-3xl font-medium'>e.COM</h1></Link>
			</div>

			<ul className="navList list-none flex justify-between items-center space-x-8 text-lg">
				<Link to={ '/' }>
					<li className={ `navItem hover:scale-110 hover:text-indigo-500 duration-150 ${location.pathname === '/' && 'text-indigo-500'}` }>Home</li>
				</Link>
				<Link to={ '/products' }>
					<li className={ `navItem hover:scale-110 hover:text-indigo-500 duration-150 ${location.pathname === '/products' && 'text-indigo-500'}` }>Products</li>
				</Link>
				<Link to={ '/aboutus' }>
					<li className={ `navItem hover:scale-110 hover:text-indigo-500 duration-150 ${location.pathname === '/aboutus' && 'text-indigo-500'}` }>About Us</li>
				</Link>
				<Link to={ '/contactus' }>
					<li className={ `navItem hover:scale-110 hover:text-indigo-500 duration-150 ${location.pathname === '/contactus' && 'text-indigo-500'} ` }>Contact Us</li>
				</Link>
			</ul>

			{
				userSession
				&& (userSession.role === 'Staff'
					? <p>staff</p>
					: <div>

					</div>
				)
			}

			{ !userSession
				? <ul className="navList list-none flex justify-between items-center space-x-8 text-xl">
					<Link to={ '/login' }>
						<li className={ `navItem hover:scale-110 hover:text-indigo-500 duration-150 ${location.pathname === '/login' && 'text-indigo-500'}` }>Login</li>
					</Link>
					<Link to={ '/signup' }>
						<li className={ `navItem hover:scale-110 hover:text-indigo-500 duration-150 ${location.pathname === '/signup' && 'text-indigo-500'}` }>Signup</li>
					</Link>



				</ul>
				: <ul className="navList list-none flex justify-between items-center space-x-8">
					<li className="navItem cursor-pointer flex flex-col justify-between items-center relative">
						<div className='flex justify-between items-center space-x-2 hover:text-indigo-500 duration-150 text-xl' onClick={ toggleDropdown }>
							<span>{ userSession.username }</span>
							<span><BsChevronCompactDown /></span>
						</div>

						{ dropdown && <div className='absolute top-10 bg-white py-2 shadow-lg border flex flex-col justify-center items-center'>
							<Link to={ '/profile' } className='px-6 py-1 hover:bg-zinc-100 active:bg-zinc-200 duration-150 w-full'>Profile</Link>

							{ userSession.role === 'Admin' && <Link to={ '/adminDashboard' } className='px-6 py-1 hover:bg-zinc-100 active:bg-zinc-200 duration-150 w-full'>Dashboard</Link> }

							{ userSession.role === 'Staff' && <Link to={ '/staffDashboard' } className='px-6 py-1 hover:bg-zinc-100 active:bg-zinc-200 duration-150 w-full'>Dashboard</Link> }

							<span className='px-6 py-1 hover:bg-zinc-100 active:bg-zinc-200 duration-150 w-full' onClick={ handleLogout }>Logout</span>
						</div> }
					</li>
				</ul>
			}
		</nav>
	)
}

export default Navbar