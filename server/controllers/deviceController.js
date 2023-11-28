const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
	async create(req, res, next) {
		try {
			let { name, price, brandId, typeId, info } = req.body
			const { img } = req.files
			let fileName = uuid.v4() + '.jpg'
			img.mv(path.resolve(__dirname, '..', 'static', fileName))
			const device = await Device.create({
				name,
				price,
				brandId,
				typeId,
				info,
				img: fileName,
			})

			if (info) {
				try {
					info = JSON.parse(info)
					info.forEach(i =>
						DeviceInfo.create({
							title: i.title,
							description: i.description,
							deviceId: device.id,
						})
					)
				} catch (error) {
					console.log(error)
				}
			}

			return res.json(device)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async getAll(req, res) {
		let { brandId, typeId, limit, page } = req.query
		page = page || 1
		limit = limit || 9

		let offset = page * limit - limit

		let devices
		if (!brandId && !typeId) {
			devices = await Device.findAndCountAll({
				limit,
				offset,
				include: [{ model: DeviceInfo, as: 'info' }],
			})
		}

		if (brandId && !typeId) {
			devices = await Device.findAndCountAll({
				where: { brandId },
				limit,
				offset,
				include: [{ model: DeviceInfo, as: 'info' }],
			})
		}

		if (!brandId && typeId) {
			devices = await Device.findAndCountAll({
				where: { typeId },
				limit,
				offset,
				include: [{ model: DeviceInfo, as: 'info' }],
			})
		}

		if (brandId && typeId) {
			devices = await Device.findAndCountAll({
				where: { brandId, typeId },
				limit,
				offset,
				include: [{ model: DeviceInfo, as: 'info' }],
			})
		}

		return res.json(devices)
	}

	async getOne(req, res) {
		const { id } = req.params
		const device = await Device.findOne({
			where: { id },
			include: [{ model: DeviceInfo, as: 'info' }],
		})
		return res.json(device)
	}

	async deleteOne(req, res, next) {
		const { name } = req.body
		const device = await Device.findOne({ where: { name } })
		if (!device) {
			next(ApiError.badRequest('Девайс не существует'))
		} else {
			await DeviceInfo.destroy({ where: { deviceId: device.id } })
			await device.destroy()
			return res.json({ message: 'Удалено' })
		}
	}
}

module.exports = new DeviceController()
