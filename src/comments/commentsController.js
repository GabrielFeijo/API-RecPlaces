require('./Comments');
const mongoose = require('mongoose');
const Comments = mongoose.model('comments');

module.exports = {
	async indexByPlace(req, res) {
		Comments.find({ placeId: req.params.placeId })
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async indexAll(req, res) {
		Comments.find({})
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async add(req, res) {
		const comments = new Comments({
			placeId: req.body.placeId,
			nome: req.body.nome,
			comentario: req.body.comentario,
			avaliacao: req.body.avaliacao,
		});
		comments
			.save()
			.then((data) => {
				console.log(data);
				res.status(201).send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async update(req, res) {
		const update = req.body.update;
		Comments.findOneAndUpdate({ _id: req.params.id }, update)
			.then((data) => {
				console.log(data);
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async deleteById(req, res) {
		Comments.findByIdAndRemove(req.params.id)
			.then((data) => {
				console.log(data);
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
};
