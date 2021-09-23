const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ExploreSchema = new Schema({
    name: { type: String},
    singer: { type: String },
    path: { type: String },
    image: { type: String },
}, {
    collection: 'Explore'
});

module.exports = mongoose.model('Explore', ExploreSchema);