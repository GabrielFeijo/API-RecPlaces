const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
	placeId: String,
	nome: String,
	comentario: String,
	avaliacao: Number,
});

mongoose.model('comments', CommentsSchema);
