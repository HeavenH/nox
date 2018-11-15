const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const authConfig = require('../../config/auth')
const User = require('../models/users');
const api = require('../utils')


const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.get('/', api.index)

router.post('/register', async (req, res) => {
    const { email, username, password, score, token } = req.body;

    try {
        if(await User.findOne({ email }))
            return res.status(400).send({ error: 'Usuário já existe! '});

        const user = await User.create(req.body);
        return res.send({
            user,
            token: generateToken({ id: user.id }),
        });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed!' });
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.status(400).send({ error: 'User not found! '});

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid password! '});

    user.password = undefined;

    res.send({
        user, 
        token: generateToken({ id: user.id }),
    });
});

module.exports = router;