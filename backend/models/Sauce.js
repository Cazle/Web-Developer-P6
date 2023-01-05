const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    sauce: {type: String, required: true},
})

module.exports = mongoose.model('Sauce', sauceSchema);