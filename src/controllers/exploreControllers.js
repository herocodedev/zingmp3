const Explore = require('../models/explore')

class exploreControllers {

    show(req, res, next) {
        Explore.find({})
            .then(music => {
                return res.json(music)
            })
    }

}
module.exports = new exploreControllers()