const Music = require('../models/Music')

class musicControllers {

    show(req, res, next) {
        Music.find({})
            .then(music => {
                return res.json(music)
            })
    }

}
module.exports = new musicControllers()