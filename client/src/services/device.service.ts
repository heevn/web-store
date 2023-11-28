import { $authHost, $host } from '.'

class DeviceService {
	async fetchDevices(
		typeId?: number | null,
		brandId?: number | null,
		page?: number | null,
		limit?: number | null
	) {
		const { data } = await $host.get('api/device', {
			params: {
				brandId,
				typeId,
				page,
				limit,
			},
		})
		return data
	}

	async createDevice(device: FormData) {
		const { data } = await $authHost.post<FormData>('api/device', device)
		return data
	}

	async fetchOneDevice(id?: string) {
		const { data } = await $host.get(`api/device/${id}`)
		return data
	}

	async deleteDevice(device?: string) {
		const { data } = await $authHost.delete('api/device', {
			data: {
				name: device,
			},
		})
		return data
	}
}

export default new DeviceService()
