const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    user_name: String,
    first_name: String,
    last_name: String,
    id: Number,
});

module.exports = mongoose.model('usuario', usuarioSchema);