import React, { useEffect } from 'react'
import './SideBar.css'
import { useAppSelector } from '../../store/hooks'
import { DeviceType } from '../../store/slices/typeSlice'
import { useActions } from '../../hooks/useActions'
import typeService from '../../services/type.service'
import brandService from '../../services/brand.service'
import { DeviceBrand } from '../../store/slices/brandSlice'

export default function SideBar() {
	const { types } = useAppSelector(state => state.type)
	const { brands } = useAppSelector(state => state.brand)
	const { selectBrand, selectType, setTypes, setBrands } = useActions()
	const {selectedBrand, selectedType} = useAppSelector(state => state.shop)

	useEffect(() => {
		try {
			typeService.fetchTypes().then(data => {
				setTypes(data)
			})
			brandService.fetchBrands().then(data => {
				setBrands(data)
			})
		} catch (e) {
			console.log(e)
		}
	}, [])

	const handleTypeSelection = (type: DeviceType) => {
		if(selectedType !== type.id)
			selectType(type.id)
		else 
			selectType(undefined)
	}

	const handleBrandSelection = (brand: DeviceBrand) => {
		if(selectedBrand !== brand.id)
			selectBrand(brand.id)
		else 
			selectBrand(undefined)
	}

	return (
		<div>
			<div className='sidebar'>
				{types.map(type => (
					<div
						className={'sidebar-content' + (selectedType === type.id ? '  sidebar-content-extend': '')}
						key={type.id}
						onClick={() => handleTypeSelection(type)}
					>
						{type.name}
					</div>
				))}
			</div>
			<div className='sidebar'>
				{brands.map(brand => (
					<div
						className={'sidebar-content' + (selectedBrand === brand.id? '  sidebar-content-extend': '')}
						key={brand.id}
						onClick={() => handleBrandSelection(brand)}
					>
						{brand.name}
					</div>
				))}
			</div>
		</div>
	)
}
