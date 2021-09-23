var express = require('express')
var router = express.Router()

const zingchartControllers = require('../controllers/zingchartControllers')

router.post('/',zingchartControllers.index)


module.exports = router