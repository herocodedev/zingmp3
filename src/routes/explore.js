var express = require('express')
var router = express.Router()

const exploreControllers = require('../controllers/exploreControllers')

router.post('/',  exploreControllers.show)

module.exports = router