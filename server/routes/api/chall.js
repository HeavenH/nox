const express = require('express')
const mongodb = require('mongodb')
const authMiddleware = require('../middlewares/auth')

const router = express.Router();

router.use(authMiddleware);

// Get Posts
router.get('/', async (req, res) => {
    const posts = await load_challenges();
    res.send(await posts.find({}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {
    const chall = await load_challenges();
    const { name, category, content, key, value } = req.body;

    try {
        if(await chall.findOne({ key }))
            return res.status(400).send({ error: 'Challenge já existe! '})

        await chall.insertOne({
            name: req.body.name,
            category: req.body.category,
            content: req.body.content,
            key: req.body.key,
            value: req.body.value
        })
        res.status(201).send("Challenge adicionada com sucesso!");
    } catch(err) {
        return res.status(400).send({ error: 'Erro ao adicionar! '})
    }
})

async function load_challenges() {
    const client = await mongodb.MongoClient.connect('mongodb://moon:moon00@ds239681.mlab.com:39681/moon', {
        useNewUrlParser: true
    })

    return client.db('moon').collection('challenges');
}

module.exports = router;
