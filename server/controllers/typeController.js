const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
  async create(req, res) {
    const {name} = req.body;
    const type = await Type.create({name});
    return res.json(type)
  }
  
  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }

  async deleteOne(req, res, next) {
    const {name} = req.body;
    const type = await Type.findOne({where: {name}});
    if(!type) {
      next(ApiError.badRequest('Тип не существует'));
    }
    else {
      await type.destroy();
      return res.json({message: "Удалено"});
    }
  }
}
  
module.exports = new TypeController()