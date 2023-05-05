require('./Description');
const mongoose = require('mongoose');
const Description = mongoose.model('description');

module.exports = {
	async indexByPlace(req, res) {
		// #swagger.tags = ['Description']
		// #swagger.description = 'Endpoint para buscar a descrição do local cadastrado.'
		Description.findOne({ placeId: req.params.placeId })
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async indexAll(req, res) {
		// #swagger.tags = ['Description']
		// #swagger.description = 'Endpoint para listar todos as descrições dos locais.'
		Description.find({})
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async add(req, res) {
		// #swagger.tags = ['Description']
		// #swagger.description = 'Endpoint para adicionar um nova descrição.'
		// #swagger.description = 'Endpoint para cadastrar um novo local.'
		/*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Dados para uma nova descrição',
                schema: {
					$placeId: '644b56af536faa0008f6c8de',
					$nome: 'Bar do Cleiton',
                    $contato: '(81) 9 9999-9999',
                    $img: 'www.local.com/bar.jpg',
                    $local: {
						rua: "Rua tal tal",
						numero: 05,
						cidade: 'Recife',
						UF: 'PE',
						CEP: '99999-999',
					},				
                    $desc: 'Aberto de sexta a domingo à partir das 15:00  Clone de Caipirinha e Caipirosca todos os dias.',				
                  
                }
        } */
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
		// #swagger.tags = ['Description']
		// #swagger.description = 'Endpoint para atualizar uma descrição pelo ID do local.'
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
		// #swagger.tags = ['Description']
		// #swagger.description = 'Endpoint para deletar uma descrição pelo ID do local.'
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
