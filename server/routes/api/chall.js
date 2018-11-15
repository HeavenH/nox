const express = require('express')
const Key = require('../models/keys');
const api_keys = require('../utils/keys')

const router = express.Router();

// Get Challenges
router.get('/', api_keys.index)

router.post('/', async (req, res) => {})
// Add Challenges
router.post('/new_chall', async (req, res) => {
    const { name, category, content, flag, value } = req.body;

    try {
        if(await Key.findOne({ flag }))
            return res.status(400).send({ error: 'Challenge já existe! '})

        const key = await Key.create(req.body);
        return res.send({
            key
        });
    } catch(err) {
        return res.status(400).send({ error: 'Erro ao adicionar! '})
    }
})

module.exports = router;
