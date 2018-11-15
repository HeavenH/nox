const mongoose = require('../../db');

const keysSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true,
    },
    flag: {
        type: String,
        require: true,
        unique: true
    },
    value: {
        type: String,
        require: true
    }
});

const Key = mongoose.model('Key', keysSchema);

module.exports = Key;