import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { useEffect, useState } from 'react'
import { UserType } from './store/slices/userSlice'
import userService from './services/user.service'
import { useActions } from './hooks/useActions'
import deviceService from './services/device.service'
import { useAppSelector } from './store/hooks'

export default function App() {
	const { logOut, logIn, setLoadingUser, setDevices, setTotalCount } =
		useActions()
	const [loading, setLoading] = useState<boolean>(true)
	const { selectedBrand, selectedType, page } = useAppSelector(
		state => state.shop
	)
	const {isLoading} = useAppSelector(state => state.shop)

	useEffect(() => {
		userService
			.check()
			.then(data => {
				if (!data) {
					logOut()
				} else {
					logIn(data as UserType)
				}
				setLoadingUser()
			})
			.then(() =>
				deviceService.fetchDevices().then(data => {
					setDevices(data.rows)
					setTotalCount(data.count)
				})
			)
			.catch(error => console.log(error))
			.finally(() => setLoading(false))
	}, [])

	useEffect(() => {
		deviceService
			.fetchDevices(selectedType, selectedBrand, page, 5)
			.then(data => {
				setDevices(data.rows)
				setTotalCount(data.count)
			})
	}, [selectedType, selectedBrand, page, isLoading])

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}
