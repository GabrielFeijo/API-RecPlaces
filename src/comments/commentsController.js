require('./Comments');
const mongoose = require('mongoose');
const Comments = mongoose.model('comments');

module.exports = {
	async indexByPlace(req, res) {
		// #swagger.tags = ['Comments']
		// #swagger.description = 'Endpoint para listar os comentários pelo local'
		Comments.find({ placeId: req.params.placeId })
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async indexAll(req, res) {
		// #swagger.tags = ['Comments']
		// #swagger.description = 'Endpoint para listar todos comentários'
		Comments.find({})
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async add(req, res) {
		// #swagger.tags = ['Comments']
		// #swagger.description = 'Endpoint para adicionar um novo comentário'

		/*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Dados para uma novo comentário',
                schema: {
					$placeId: 'Bar do Cleiton',
					$nome: 'Bar do Cleiton',
                    $comentario: 'www.local.com/cleiton.jpg',
                    $avaliacao: 'Bar'
                }
        } */

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
		// #swagger.tags = ['Comments']
		// #swagger.description = 'Endpoint para atualizar um comentário'
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
		// #swagger.tags = ['Comments']
		// #swagger.description = 'Endpoint para deletar um comentário por ID'
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
