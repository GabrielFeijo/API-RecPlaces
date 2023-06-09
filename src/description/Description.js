const mongoose = require('mongoose');

const DescriptionSchema = new mongoose.Schema({
	placeId: String,
	nome: String,
	contato: String,
	img: String,
	local: {
		rua: String,
		numero: Number,
		cidade: String,
		UF: String,
		CEP: String,
	},
	desc: String,
});

mongoose.model('description', DescriptionSchema);
