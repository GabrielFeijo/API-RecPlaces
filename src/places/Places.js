const mongoose = require('mongoose');

const PlacesSchema = new mongoose.Schema({
	category: String,
	nome: String,
	tipo: String,
	distancia: String,
	stars: Number,
});

mongoose.model('places', PlacesSchema);
