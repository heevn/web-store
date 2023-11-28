import React from 'react'
import './AddDeviceButton.css'
import {ReactComponent as PlusIcon} from '../../assets/plus-icon.svg'
import { AddDeviceButtonProps } from './AddDeviceButtonProps'

export default function AddDeviceButton({onClick} : AddDeviceButtonProps) {
	return (
		<div className='device-add-button' onClick={onClick}>
			<PlusIcon className='device-add-pic' height="150" fill="gray"/>
		</div>
	)
}
