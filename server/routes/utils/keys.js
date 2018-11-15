const mongoose = require('mongoose');

const key = mongoose.model("Key");

module.exports = {
    async index(req, res) {
        const keys = await key.find()

        return res.json(keys)
    }
}