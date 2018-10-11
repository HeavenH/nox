const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await loadUsers();
    res.send(await users.find({}).toArray());
});

router.post('/register', async (req, res) => {
    const user = await loadUsers();
    const { email, password } = req.body;
    const senha = bcrypt.hashSync(password, 7)

    try {
        if(await user.findOne({ email }))
            return res.status(400).send({ error: 'Usuário já existe! '});

        await user.insertOne({
            email: req.body.email,
            password: senha
        })
        res.status(201).send('Cadastro realizado com sucesso!');
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed!' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await loadUsers();

    const login = await user.findOne({ email })

    if (!login)
        return res.status(400).send({ error: 'User not found! '});

    if (!await bcrypt.compare(password, login.password))
        return res.status(400).send({ error: 'Invalid password! '});

    login.password = undefined;

    res.send({
        login,
    });
});

async function loadUsers() {
    const client = await mongodb.MongoClient.connect('mongodb://moon:moon00@ds239681.mlab.com:39681/moon', {
        useNewUrlParser: true
    });

    return client.db('moon').collection('users');
}

module.exports = router;