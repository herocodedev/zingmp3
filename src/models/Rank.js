const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ZingchartSchema = new Schema({
    name: { type: String},
    singer: { type: String },
    path: { type: String },
    image: { type: String },
}, {
    collection: 'Rank'
});

module.exports = mongoose.model('Zingchart', ZingchartSchema);