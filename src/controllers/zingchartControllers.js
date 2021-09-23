
const Rank = require('../models/Rank')
class zingchartControllers {
    // [GET] / zingchart
    show(req, res, next) {
        res.render('zingchart')
    }

    //[POST] /zingchart
    index(req,res,next){
        Rank.find({})
        .then(music => {
            return res.json(music)
        })
    }
}
module.exports = new zingchartControllers()