var express = require('express')
var router = express.Router()

const musicControllers = require('../controllers/musicControllers')

router.post('/', musicControllers.show)

module.exports = router