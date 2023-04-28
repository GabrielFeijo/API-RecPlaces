const mongoose = require('mongoose');

const PlacesSchema = new mongoose.Schema({
	category: String,
	nome: String,
	tipo: String,
	distancia: Number,
	stars: Number,
});

mongoose.model('places', PlacesSchema);
