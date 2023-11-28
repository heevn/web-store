import basketService from '../../services/basket.service'
import './BasketDevice.css'

import { BasketDeviceProps } from './BasketDeviceProps'

export default function BasketDevice({ basketDevice }: BasketDeviceProps) {
	const deleteBasketDevice = (data : number) => {
		basketService.deleteBasketDevice(data)
	}

	console.log(basketDevice)

	return (
		<div className='basket-device'>
			<div className='basket-device-wrapper'>
				<img
					className='basket-device-img'
					src={process.env.REACT_APP_API_URL + basketDevice.img}
					alt='basketpic'
				/>
				<div className='basket-device-name'>{basketDevice.name}</div>
			</div>
			<form className='basket-device-form'>
				<div className='basket-device-price'>
					{new Intl.NumberFormat('ru-RU', {
						style: 'currency',
						currency: 'USD',
					}).format(basketDevice.price)}
				</div>
				<button className='basket-device-button' onClick={() => deleteBasketDevice(basketDevice.idInBasket)}>-</button>
			</form>
		</div>
	)
}
