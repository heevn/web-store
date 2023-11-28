import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { DeviceInfo, DeviceProps } from '../../store/slices/deviceSlice'
import deviceService from '../../services/device.service'
import { useAppSelector } from '../../store/hooks'
import useInfo from '../../hooks/useInfo'
import './DeviceForm.css'
import { useActions } from '../../hooks/useActions'

export default function DeviceForm({
	info,
	setInfo,
}: {
	info: DeviceInfo[] | undefined
	setInfo: React.Dispatch<React.SetStateAction<DeviceInfo[] | undefined>>
}) {
	const { types } = useAppSelector(state => state.type)
	const { brands } = useAppSelector(state => state.brand)
	const { setLoading } = useActions()

	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm<DeviceProps>({ mode: 'onBlur' })
	const onSubmit: SubmitHandler<DeviceProps> = data => {
		const formData = new FormData()
		formData.append('name', data.name)
		formData.append('price', data.price.toString())
		formData.append('typeId', data.typeId.toString())
		formData.append('brandId', data.brandId.toString())
		formData.append('img', data.img[0])
		if(info) {
			formData.append('info', JSON.stringify(info))
		}
		deviceService.createDevice(formData)
		alert('Device successfully added!')
		setInfo([])
		setLoading()
		reset()
	}

	return (
		<form className='flex-container wrapper' onSubmit={handleSubmit(onSubmit)}>
			<input
				{...register('name', { required: 'Name is required' })}
				placeholder='Enter device name...'
			/>
			{errors?.name && <div>{errors?.name.message}</div>}
			<select
				{...register('typeId', { required: 'Type is required' })}
				className='form-select'
			>
				<option defaultValue=''>Select type...</option>
				{types.map(type => (
					<option key={type.id} value={type.id}>
						{type.name}
					</option>
				))}
			</select>
			<select
				{...register('brandId', { required: 'Brand is required' })}
				className='form-select'
			>
				<option defaultValue=''>Select brand...</option>
				{brands.map(brand => (
					<option key={brand.id} value={brand.id}>
						{brand.name}
					</option>
				))}
			</select>
			<input {...register('img')} type='file' accept='image/png, image/jpeg' />
			<input
				{...register('price', { required: 'Price is required' })}
				type='number'
				placeholder='Enter price...'
				min='0'
			/>
			<button className='form-button'>Add</button>
		</form>
	)
}
