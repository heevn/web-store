const ApiError = require('../error/ApiError')
const { Basket, BasketDevice, Device } = require('../models/models')

class BasketController {
	async getDevices(req, res) {
		const currentUserId = req.user.id
		const basketDevices = await BasketDevice.findAll({
			where: { basketId: currentUserId },
		})
		return res.json(basketDevices)
	}

	async addDevice(req, res, next) {
		const { id } = req.body
		const currentUserId = req.user.id
		const neededDevice = await Device.findOne({ where: { id } })
		if (!neededDevice) {
			next(ApiError.badRequest('Такого девайса не существует'))
		}
		const basketDevice = await BasketDevice.create({
			basketId: currentUserId,
			deviceId: neededDevice.id,
		})
		return res.json(basketDevice)
	}

	async deleteDevice(req, res, next) {
		const { id } = req.body
		const basketDevice = await BasketDevice.findOne({ where: { id } })
		if (!basketDevice) {
			next(ApiError.badRequest('Девайс не в корзине'))
		} else {
			await basketDevice.destroy()
			return res.json({ message: 'Удалено' })
		}
	}
}

module.exports = new BasketController()
