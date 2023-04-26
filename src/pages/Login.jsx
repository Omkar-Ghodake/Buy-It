import React, { useContext, useState, useEffect } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { RxEyeOpen, RxEyeClosed } from 'react-icons/rx'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserState'

const Login = () => {
	const cookies = new Cookies()
	const navigate = useNavigate()

	const { userSession, getUserInfo } = useContext(UserContext)

	const [passHidden, setPassHidden] = useState(true)
	const [formData, setFormData] = useState(null)
	const [redirectTime, setRedirectTime] = useState(3)

	const handleLoginFormSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await fetch('http://localhost:5000/api/auth/login', {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const data = await response.json()

			if (data.success) {
				cookies.set('authToken', data.authToken)

				getUserInfo()

				setFormData(null)

				toast.success(`Welcome ${data.username}!`, {
					position: "top-left",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				})

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

	const togglePassHidden = () => {
		passHidden
			? setPassHidden(false)
			: setPassHidden(true)
	}

	const handleOnChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const reduceRedirectTime = () => {
		setRedirectTime(redirectTime - 1)
	}

	useEffect(() => {
		userSession && setTimeout(() => {
			reduceRedirectTime()
		}, 1000)

		redirectTime === 0 && navigate('/')
	}, [redirectTime])


	return (
		<>
			<div className='container mx-auto'>
				{
					!userSession
						? <div className="w-1/2 mx-auto shadow-xl bg-white rounded-lg">
							<div className='p-8'>
								<div className="head text-center text-3xl font-medium">
									LOGIN
								</div>

								<form className="body mt-8 flex flex-col justify-center items-center space-y-8" onSubmit={ handleLoginFormSubmit }>
									<div className="input-group w-1/2 rounded relative">
										<label htmlFor="email" className='absolute -top-3 left-3 bg-white px-[7px]'>Username or Email</label>
										<input type="text" id='email' name='email' className='outline-none border-2 border-slate-300 focus:border-indigo-500 p-3 rounded duration-150 w-full' onChange={ handleOnChange } required />
										<HiOutlineMail className='absolute right-2 top-3 text-2xl' />
									</div>

									<div className="input-group w-1/2 rounded relative">
										<label htmlFor="password" className='absolute -top-3 left-3 bg-white px-[7px]'>Password</label>
										<input type={ `${passHidden ? 'password' : 'text'}` } id='password' name='password' className={ `outline-none border-2 border-slate-300 focus:border-indigo-500 p-3 rounded duration-150 w-full ${passHidden && 'tracking-widest'}` } onChange={ handleOnChange } minLength={ 8 } required />
										{ passHidden ?
											< RxEyeClosed className={ `absolute right-2 top-2 text-4xl cursor-pointer hover:bg-slate-100 rounded-full p-2 duration-150` } onClick={ togglePassHidden } /> :
											< RxEyeOpen className={ `absolute right-2 top-2 text-4xl cursor-pointer hover:bg-slate-100 rounded-full p-2 duration-150` } onClick={ togglePassHidden } />
										}
									</div>

									<button role={ 'submit' } className='border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50 active:bg-white w-1/2 p-3 duration-150'>LOGIN</button>
								</form>

								<div className='flex flex-col items-center space-y-3 justify-center mt-8'>
									<p>or Login with</p>

									<div className="flex space-x-5">
										<FcGoogle className='text-5xl cursor-pointer hover:bg-zinc-200 rounded-full p-2 duration-150' />
										<FaFacebook className='text-5xl cursor-pointer hover:bg-zinc-200 rounded-full p-2 duration-150 text-facebook' />
									</div>
								</div>

								<div className='border mt-8 w-1/2 mx-auto'></div>

								<div className='flex flex-col items-center justify-center mt-8 space-y-5'>
									<p>Don't have an Account?</p>
									<Link to={ '/signup' } className='w-1/2'>
										<button className='border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50 active:bg-white w-full p-3 duration-150'>
											SIGNUP
										</button>
									</Link>
								</div>
							</div>
							<div className="footer mt-8 bg-indigo-300 rounded-b-lg p-5">
								<div className="head text-center text-3xl font-medium">
									e.COM
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
			</div>
		</>
	)
}

export default Login