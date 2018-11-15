const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/nox", { useNewUrlParser: true }).catch
                (err => console.log('Erro ao conectar a database'));
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = mongoose;