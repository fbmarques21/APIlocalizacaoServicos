const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocalizacaoSchema = new Schema({
    rua: {
        type: String,
        required: true,
    },
    supermercado: {
        type: String,
        required: false,
    },
    farmacia:{
        type: String,
        required: false,
    },
    restaurante: {
        type: String,
        required: false,
    },
    banco: {
        type: String,
        required: false,
    }

});

module.exports = mongoose.model('Localizacao', LocalizacaoSchema);