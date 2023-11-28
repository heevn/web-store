import { SubmitHandler, useForm } from 'react-hook-form'
import { ModalProps } from '../ModalProps'
import './SingleModal.css'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import brandService from '../../../services/brand.service'
import typeService from '../../../services/type.service'
import deviceService from '../../../services/device.service'

export default function SingleModal({
	active,
	closeWindow,
	action,
}: ModalProps) {
	const [data, setData] = useState<string>()

	const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
		setData(event.target.value)
	}

	const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault()
	}

	const handleClick = (data: string | undefined, action: string | undefined) => {
		switch (action) {
			case 'add-type':
				typeService.createType(data)
				alert('Succesfuly added!')
				setData('')
				break
			case 'add-brand':
				brandService.createBrand(data)
				alert('Succesfuly added!')
				setData('')
				break
			case 'delete-type':
				typeService.deleteType(data)
				alert('Succesfuly deleted!')
				setData('')
				break
			case 'delete-brand':
				brandService.deleteBrand(data)
				alert('Succesfuly deleted!')
				setData('')
				break
			case 'delete-device':
				deviceService.deleteDevice(data)
				alert('Succesfuly deleted!')
				setData('')
				break
		}
	}

	return (
		<div
			className='modal-window'
			style={{ display: active ? 'block' : 'none' }}  onClick={closeWindow}
		>
			<div className='flex-container modal-content' onClick={(e) => e.stopPropagation()}>
				<form className='flex-container wrapper' onSubmit={handleSubmit}>
					<input value={data} placeholder='Name' onChange={handleInput}></input>
					<button
						className='modal-button'
						onClick={() => handleClick(data, action)}
					>
						{action === 'add-type' ? 'Add' : 'Delete'}
					</button>
				</form>
				<span className='close' onClick={closeWindow}>
					&times;
				</span>
			</div>
		</div>
	)
}
