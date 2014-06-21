var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var gifSchema = mongoose.Schema({
    name: { type: String, required: true },
    votes: { type: Number, required: true },
    imgUrl: { type: String, required: true },
    created: { type: Date }
  }, {collection: 'Gif'});

gifSchema.plugin(autoIncrement.plugin)

module.exports = mongoose.model('Gif', gifSchema);