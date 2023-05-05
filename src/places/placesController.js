require('./Places');
const mongoose = require('mongoose');
const Places = mongoose.model('places');

module.exports = {
	async indexByTipo(req, res) {
		// #swagger.tags = ['Places']
		// #swagger.description = 'Endpoint para listar os local por tipo. Ex: Restaurantes, Bares e etc'
		Places.find({ tipo: req.params.tipo })
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async indexAll(req, res) {
		// #swagger.tags = ['Places']
		// #swagger.description = 'Endpoint para listar todos os locais cadastrados.'
		Places.find({})
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async indexByName(req, res) {
		// #swagger.tags = ['Places']
		// #swagger.description = 'Endpoint para listar os locais cadastrados com nome específico.'

		const search = req.query.search;
		Places.find({ nome: { $regex: search, $options: 'i' } })
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async add(req, res) {
		// #swagger.tags = ['Places']
		// #swagger.description = 'Endpoint para cadastrar um novo local.'
		/*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Dados de um novo local',
                schema: {
					$nome: 'Bar do Cleiton',
                    $img: 'www.local.com/cleiton.jpg',
                    $tipo: 'Bar',
                    $distancia: 4,				
                    $stars: 5,				
                    $value: 50,				
                    $allDay: true	
                }
        } */

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
		// #swagger.tags = ['Places']
		// #swagger.description = 'Endpoint para atualizar um local já cadastrado.'

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
		// #swagger.tags = ['Places']
		// #swagger.description = 'Endpoint para deletar novo local por ID.'
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
