import { useState } from 'react'
import { DeviceInfo } from '../store/slices/deviceSlice'

const useInfo = () => {
	const [info, setInfo] = useState<DeviceInfo[]>()
	const addInfo = () => {
    setInfo([...(info || []), {title: '', description: '', id: Date.now()}])
  }

  const removeInfo = (id : number) => {
    setInfo(info?.filter(i => i.id !== id))
  }

	const changeInfo = (key : string, value : string, id : number) => {
		console.log(info)
		setInfo(info?.map(i => i.id === id ? {...i, [key]: value} : i))
	}
	
	const getInfo = () => {
		return info
	}

	return {addInfo, removeInfo, info, setInfo, changeInfo, getInfo}
}


export default useInfo