var mongoose = require('mongoose');

var gifSchema = mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    votes: { type: Number, required: true }
  }, {collection: 'Gif'});

module.exports = mongoose.model('Gif', gifSchema);