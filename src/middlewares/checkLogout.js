const User = require('../models/User')
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    if (req.session.token) {
        var data = req.session.token
        try {
            if (data) {
                res.redirect('/private')
            } else {
                next()
            }
        } catch (error) {
            console.log(error)
            res.json('Loi!')
        }
    } else if (req.user) {
        res.redirect('/private')
    } else {
        next()
    }
}