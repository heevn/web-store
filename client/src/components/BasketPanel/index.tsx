import { useEffect, useState } from 'react'
import basketService from '../../services/basket.service'
import { useAppSelector } from '../../store/hooks'
import './BasketPanel.css'
import { BasketDeviceType } from '../../store/slices/basketSlice'
import BasketDevice from '../BasketDevice'
import { ExtendedBasketDevice } from '../BasketDevice/BasketDeviceProps'

export default function BasketPanel() {
	const { devices } = useAppSelector(state => state.device)
	const [filteredBasketDevices, setFilteredBasketDevices] = useState<
		ExtendedBasketDevice[]
	>([])

	useEffect(() => {
		basketService.getDevices().then(data => {
			const indexes = data.map((device: BasketDeviceType) => device.deviceId)
			const tempDevices = devices
				.map(device => {
					const i = indexes.indexOf(device.id)
					return { ...device, idInBasket: i !== -1 ? data[i].id : undefined }
				})
				.filter(device => device.idInBasket)
			setFilteredBasketDevices(tempDevices)
		})
	}, [])

	return (
		<div className='basket-layout'>
			<div className='basket-wrapper'>
				<div className='basket-content'>
					{filteredBasketDevices.map(basketDevice => (
						<BasketDevice key={basketDevice.id} basketDevice={basketDevice} />
					))}
				</div>
			</div>
		</div>
	)
}
