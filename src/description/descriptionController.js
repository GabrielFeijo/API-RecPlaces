require('./Description');
const mongoose = require('mongoose');
const Description = mongoose.model('description');

module.exports = {
	async indexByPlace(req, res) {
		Description.findOne({ placeId: req.params.placeId })
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async indexAll(req, res) {
		Description.find({})
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async add(req, res) {
		const description = new Description({
			placeId: req.body.placeId,
			nome: req.body.nome,
			contato: req.body.contato,
			img: req.body.img,
			local: req.body.local,
			desc: req.body.desc,
		});
		description
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
		Description.findOneAndUpdate({ placeId: req.params.placeId }, update)
			.then((data) => {
				console.log(data);
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async deleteById(req, res) {
		Description.findOneAndRemove(req.params.placeId)
			.then((data) => {
				console.log(data);
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
};
