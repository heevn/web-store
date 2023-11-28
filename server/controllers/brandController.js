const { Brand } = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
	async create(req, res) {
		const { name } = req.body
		const brand = await Brand.create({ name })
		return res.json(brand)
	}

	async getAll(req, res) {
		const brands = await Brand.findAll()
		return res.json(brands)
	}

	async deleteOne(req, res, next) {
		const { name } = req.body
		const type = await Brand.findOne({ where: { name } })
		if (!type) {
			next(ApiError.badRequest('Тип не существует'))
		} else {
			await type.destroy()
			return res.json({ message: 'Удалено' })
		}
	}
}

module.exports = new BrandController()
