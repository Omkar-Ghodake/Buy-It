import React, { createContext, useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'

const UserContext = createContext()

const UserState = (props) => {
	const cookies = new Cookies()

	const [userSession, setUserSession] = useState(null)

	const getUserInfo = async () => {
		const response = await fetch('http://localhost:5000/api/user/getUser', {
			headers: {
				'Content-Type': 'application/json',
				'authToken': cookies.get('authToken')
			}
		})

		const data = await response.json()

		if (data.success) {
			setUserSession(data.user)
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
	}

	useEffect(() => {
		cookies.get('authToken') && getUserInfo()
	}, [cookies.get('authToken')])

	return (
		<UserContext.Provider value={ { userSession, setUserSession, getUserInfo } }>
			{ props.children }
		</UserContext.Provider>
	)
}

export {
	UserState,
	UserContext
}