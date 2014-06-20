var mongoose = require('mongoose');

var subscriptionSchema = mongoose.Schema({
    email: { type: String, required: true },
    date: { type: Date, required: true }
  }, {collection: 'Subscription'});

module.exports = mongoose.model('Subscription', subscriptionSchema);