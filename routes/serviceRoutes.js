
const router = require('express').Router()
const serviceCtrl = require('../controllers/serviceCtrl')

router.route('/services')
.get(serviceCtrl.getServices)
.post(serviceCtrl.createService)

router.route('/services/:id')
    .delete(serviceCtrl.deleteService)
    .put(serviceCtrl.updateService)





module.exports = router