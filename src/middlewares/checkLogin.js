const User = require('../models/User')
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    if (req.session.token) {
        var data = req.session.token 
        try {
            if (data) {
                var idObj = jwt.verify(data, 'mk')
                User.findById(idObj.id)
                    .then((user) => {
                        if (user) {
                            req.data = user
                            next()
                        } else {
                            res.redirect('/login')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.json('Loi Token!')
                    })
            }
        } catch (error) {
            console.log(error)
            res.json('Loi!')
        }

    } else if (req.user) {
        next()
    } else {
        res.redirect('/login')
    }
}