require('./User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const auth = require('../auth/authController');

module.exports = {
	async indexByUser(req, res) {
		// #swagger.tags = ['User']
		// #swagger.description = 'Endpoint para buscar usuário por ID'
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);
		if (authorized) {
			User.findOne({ _id: id })
				.then((data) => {
					res.send(data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			res.status(401).send('Não autorizado');
		}
	},
	async indexAll(req, res) {
		// #swagger.tags = ['User']
		// #swagger.description = 'Endpoint para listar todos os usuários'

		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);
		if (authorized) {
			User.find({})
				.then((data) => {
					res.send(data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			res.status(401).send('Não autorizado');
		}
	},
	async add(req, res) {
		// #swagger.tags = ['User']
		// #swagger.description = 'Endpoint para adcionar um novo usuário'
		/*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Dados do novo usuário',
                schema: {
					$nome: 'Swagger Junior',
                    $email: 'swagger@gmail.com',
                    $senha: 'Uma senha forte',
                    $roles: ['user']				

                }
        } */
		const existente = await User.findOne({ email: req.body.email });

		if (!existente) {
			const salt = bcrypt.genSaltSync();
			senhaHash = bcrypt.hashSync(req.body.senha, salt);
			const user = new User({
				nome: req.body.nome,
				email: req.body.email,
				senha: senhaHash,
				roles: req.body.roles,
			});
			user
				.save()
				.then((data) => {
					console.log(data);
					res.status(201).send(data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			res.status(409).send('Usuário já cadastrado');
		}
	},
	async update(req, res) {
		// #swagger.tags = ['User']
		// #swagger.description = 'Endpoint para atualizar um usuário'
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);
		if (authorized) {
			const salt = bcrypt.genSaltSync();
			senhaHash = bcrypt.hashSync(req.body.senha, salt);
			User.findByIdAndUpdate(id, {
				nome: req.body.nome,
				email: req.body.email,
				senha: senhaHash,
				roles: req.body.roles,
			})
				.then((data) => {
					console.log(data);
					res.send(data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			res.status(401).send('Não autorizado');
		}
	},
	async deleteById(req, res) {
		// #swagger.tags = ['User']
		// #swagger.description = 'Endpoint para deletar um usuário'
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);

		if (authorized) {
			User.findByIdAndRemove(req.params.id)
				.then((data) => {
					console.log(data);
					res.send(data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			res.status(401).send('Não autorizado');
		}
	},
	async newUser(user) {
		// #swagger.tags = ['User']
		// #swagger.description = 'Endpoint para adcionar um novo usuário'
		const { nome, email, senha, roles } = user;

		const existente = await User.findOne({ email: email });

		if (!existente) {
			const salt = bcrypt.genSaltSync();
			senhaHash = bcrypt.hashSync(senha, salt);
			const user = new User({
				nome: nome,
				email: email,
				senha: senhaHash,
				roles: roles,
			});
			return user
				.save()
				.then((data) => {
					console.log(data);
					return { result: data, statusCode: 201 };
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			throw { result: 'Usuário já cadastrado', statusCode: 409 };
		}
	},
};
