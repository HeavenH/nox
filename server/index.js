const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const chall = require('./routes/api/chall');
const auth = require('./routes/api/auth');

app.use('/api/challs', chall)
app.use('/api/users', auth)

// Handle production
if(process.env.NODE_ENV === 'production') {
    // static folder
    app.use(express.static(__dirname + '/public/'))

    // handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));