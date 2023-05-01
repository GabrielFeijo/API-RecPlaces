require('./Places');
const mongoose = require('mongoose');
const Places = mongoose.model('places');

module.exports = {
	async indexByTipo(req, res) {
		Places.find({ tipo: req.params.tipo })
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async indexAll(req, res) {
		Places.find({})
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async add(req, res) {
		const place = new Places({
			nome: req.body.nome,
			img: req.body.img,
			tipo: req.body.tipo,
			distancia: req.body.distancia,
			stars: req.body.stars,
			value: req.body.value,
			allDay: req.body.allDay,
		});
		place
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
		Places.findOneAndUpdate({ _id: req.params.id }, update)
			.then((data) => {
				console.log(data);
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async deleteById(req, res) {
		Places.findByIdAndRemove(req.params.id)
			.then((data) => {
				console.log(data);
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
};
