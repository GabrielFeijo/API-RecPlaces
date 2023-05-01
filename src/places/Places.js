const mongoose = require('mongoose');

const PlacesSchema = new mongoose.Schema({
	nome: String,
	img: String,
	tipo: String,
	distancia: Number,
	stars: Number,
	value: Number,
	allDay: Boolean,
});

mongoose.model('places', PlacesSchema);
