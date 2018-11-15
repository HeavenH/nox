const mongoose = require('../../db');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    username: {
        type: String,
        required: true,
    },
    score: {
        type: String,
        required: false
    }
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 7);
    this.password = hash;

    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;