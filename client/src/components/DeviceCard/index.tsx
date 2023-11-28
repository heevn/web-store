import React, { SyntheticEvent } from 'react'
import './DeviceCard.css'
import { generatePath, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../routes/routes';
import { DeviceCardProps } from './DeviceCardProps';
import deviceService from '../../services/device.service';
import { useAppSelector } from '../../store/hooks';

export default function DeviceCard({device} : DeviceCardProps) {
  const { role } = useAppSelector(state => state.user)

  const navigate = useNavigate();

  const routeChange = () => {
    const path = generatePath(AppRoutes.DEVICE, {deviceId: device.id.toString()});
    navigate(path);
  }

  const handleDeviceDelete = (e : SyntheticEvent) => {
    e.stopPropagation()
    deviceService.deleteDevice(device.name)
  }

  return (
    <div className='device-card' onClick={routeChange}>
      <img className='device-pic' src={process.env.REACT_APP_API_URL + device.img} alt='pizda'></img>
      <div className='device-card-name'>{device.name}</div>
      <div className='device-card-price'>Price: {new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'USD',
      }).format(device.price)}</div>
      <div className='device-container'>
        <div className='device-card-rating'>Rating: {device.rating}</div>
        {
          role === 'ADMIN' &&
          <button className='device-delete-button' onClick={handleDeviceDelete}>-</button>
        }
      </div>
    </div>
  )
}
