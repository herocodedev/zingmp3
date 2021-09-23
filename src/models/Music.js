const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MusicSchema = new Schema({
    name: { type: String},
    singer: { type: String },
    path: { type: String },
    image: { type: String },
}, {
    collection: 'Music'
});

module.exports = mongoose.model('Music', MusicSchema);