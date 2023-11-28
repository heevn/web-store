import { useParams } from 'react-router-dom'
import addToCartIcon from '../../assets/cart-plus.svg'
import starIcon from '../../assets/star.svg'
import basketService from '../../services/basket.service'
import { useAppSelector } from '../../store/hooks'
import './DeviceAbout.css'

export default function DeviceAbout() {
	const { deviceId } = useParams()
	const { devices } = useAppSelector(state => state.device)

	const result = devices.find(device => deviceId && device.id === +deviceId)

	const handleBasketDevice = (deviceId : number | undefined) => {
		if(deviceId) {
			basketService.addBasketDevice(deviceId)
		} else {
			console.log('undefined')
		}
	}

	return (
		<div className='layout'>
			<div className='device-about'>
				<img
					className='device-about-devicepic'
					src={process.env.REACT_APP_API_URL + result?.img}
					alt='huy'
				/>
				<div className='device-about-wrapper'>
					<div className='device-about-name'>{result?.name}</div>
					{result?.info.map(device => (
						<div key={device.id} className='device-about-description'>
							<b>{device.title}</b>: {device.description}
						</div>
					))}
					<div className='device-about-rating'>
						<div>
							5
							<img
								className='device-about-starpic'
								src={starIcon}
								alt='zvizda'
							></img>
						</div>
						<button
							className='device-about-add-to-basket'
							onClick={() => handleBasketDevice(result?.id)}
						>
							<img
								className='device-about-basketpic'
								src={addToCartIcon}
								alt='ped'
							></img>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
