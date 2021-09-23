class homeControllers {

    show(req, res, next) {
        res.render('login')
    }

}
module.exports = new homeControllers()