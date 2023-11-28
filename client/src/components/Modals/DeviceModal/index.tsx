import { SubmitHandler, useForm } from 'react-hook-form'
import deviceService from '../../../services/device.service'
import { useAppSelector } from '../../../store/hooks'
import { DeviceProps } from '../../../store/slices/deviceSlice'
import { ModalProps } from '../ModalProps'
import './DeviceModal.css'
import useInfo from '../../../hooks/useInfo'
import DeviceForm from '../../DeviceForm'

export default function DeviceModal({ active, closeWindow }: ModalProps) {
	const { addInfo, removeInfo, info, changeInfo, setInfo } = useInfo()

	return (
		<div
			className='modal-window'
			style={{ display: active ? 'block' : 'none' }}
			onClick={closeWindow}
		>
			<div className='flex-container modal-content' 
			onClick={(e) => e.stopPropagation()}>
				<div>
					<DeviceForm info={info} setInfo={setInfo}/>
					<button className='modal-button' onClick={addInfo}>
						Add prop
					</button>
					{info?.map(i => (
						<>
							<div key={i.id} className='flex-container modal-prop-wrapper'>
								<input value={i.title} onChange={(e) => changeInfo('title', e.target.value, i.id)}placeholder='title'></input>
								<input value={i.description} onChange={(e) => changeInfo('description', e.target.value, i.id)}placeholder='description'></input>
								<button onClick={() => removeInfo(i.id)}>Delete</button>
							</div>
						</>
					))}
				</div>
				<span className='close' onClick={closeWindow}>
					&times;
				</span>
			</div>
		</div>
	)
}
