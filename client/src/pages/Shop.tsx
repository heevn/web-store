import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import DeviceBar from '../components/DeviceBar'
import DeviceCard from '../components/DeviceCard'
import ShopForm from '../components/ShopForm'
import { useAppSelector } from '../store/hooks'
import Pagination from '../components/Pagination'
import AddDeviceButton from '../ui/AddDeviceButton'
import DeviceModal from '../components/Modals/DeviceModal'

export default function Shop() {
	const { devices } = useAppSelector(state => state.device)
	const { role } = useAppSelector(state => state.user)
	const [active, setActive] = useState<boolean>(false);
  
	const handleModalWindow = () => {
    setActive(true)
	}

  const closeModalWindow = () => {
    setActive(false)
	}

	return (
		<>
			<ShopForm>
				<SideBar />
				<DeviceBar>
					{devices.map(device => (
						<DeviceCard key={device.id} {...{ device }} />
					))}
					{
						role === 'ADMIN' &&
						<AddDeviceButton onClick={handleModalWindow}/>
					}
				</DeviceBar>
				<DeviceModal active={active} closeWindow={closeModalWindow}/>
			</ShopForm>
			<Pagination />
		</>
	)
}
