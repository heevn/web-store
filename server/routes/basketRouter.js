const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, basketController.getDevices)
router.post('/', authMiddleware, basketController.addDevice)
router.delete('/', authMiddleware, basketController.deleteDevice)

module.exports = router
