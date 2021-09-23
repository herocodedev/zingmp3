const homeRouter = require('./home')
const musicRouter = require('./music')
const exploreRouter = require('./explore')
const zingchartRouter = require('./zingchart')


function route(app) {
    app.use('/music',musicRouter)
    app.use('/explore',exploreRouter)
    app.use('/zingchart',zingchartRouter)
    app.use('/', homeRouter)
}

module.exports = route