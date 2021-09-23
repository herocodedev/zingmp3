var express = require('express')
var router = express.Router()

const homeControllers = require('../controllers/homeControllers')
const musicControllers = require('../controllers/musicControllers')


router.get('/', homeControllers.show)


module.exports = router