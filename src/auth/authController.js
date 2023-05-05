require('../user/User');
const uuid = require('uuid');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const bcrypt = require('bcryptjs');

module.exports = {
	async genAccess(req, res) {
		// #swagger.tags = ['Authentication']
		// #swagger.description = 'Endpoint para gerar uma chave de autenticação do usuário'
		/*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Dados necessários para gerar a chave',
                schema: {
					$email: 'Email do usuário que deseja se autenticar',
                    $senha: 'Senha do usuário que deseja se autenticar',

                }
        } */
		let result = {};
		let messages = [];
		let statusCode = 500;
		let { email, senha } = req.body;

		try {
			let user = await User.findOne({ email: email });

			if (user && bcrypt.compareSync(senha, user.senha)) {
				user.token = uuid.v4();

				user = await user.save();

				result = {
					id: user._id,
					token: user.token,
					roles: user.roles,
					nome: user.nome,
				};

				messages.push('Usuário autorizado.');
				statusCode = 200;
			} else {
				messages.push('Não autorizado.');
				statusCode = 401;
			}

			return res.status(statusCode).json({ result, messages });
		} catch (err) {
			console.log('err', err);
			if (err.name) err = err.name;
			return res.status(statusCode).json({ result: err, messages });
		}
	},

	async checkAccess(id, token) {
		let result = false;

		try {
			let user = await User.findOne({ _id: id });

			if (user && user.token === token) {
				result = true;
			}

			return result;
		} catch (err) {
			return result;
		}
	},

	async publicCheckAccess(req, res) {
		// #swagger.tags = ['Authentication']
		// #swagger.description = 'Endpoint para verificar se chave de autenticação é valida'

		/* #swagger.parameters['id'] = {
	       in: 'header',
               description: 'ID do usuário autenticado.',
               type: 'string'
        } */
		/* #swagger.parameters['token'] = {
	       in: 'header',
               description: 'Token gerado na última autenticação.',
               type: 'string'
        } */
		let result = {};
		let messages = [];
		let statusCode = 500;
		let { id, token } = req.headers;

		try {
			let user = await User.findOne({ _id: id });

			if (user) {
				result = { authorized: user && user.token === token };

				if (result) {
					messages.push('Usuário autorizado.');
					statusCode = 200;
				} else {
					messages.push('Não autorizado.');
					statusCode = 401;
				}
			} else {
				messages.push('Não autorizado.');
				statusCode = 401;
			}

			return res.status(statusCode).json({ result, messages });
		} catch (err) {
			return res.status(statusCode).json({ result: err, messages });
		}
	},
};
