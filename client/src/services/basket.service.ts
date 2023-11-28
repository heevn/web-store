import { $authHost } from '.'

class BasketService {
	async getDevices() {
		const { data } = await $authHost.get('api/basket')
		return data
	}

	async addBasketDevice(deviceId: number) {
		const { data } = await $authHost.post(`api/basket`, 
			{
				id: deviceId
			}
		)
		return data
	}

	async deleteBasketDevice(basketDevice?: number) {
		const { data } = await $authHost.delete('api/basket', {
			data: {
				id: basketDevice,
			},
		})
		return data
	}
}

export default new BasketService()
