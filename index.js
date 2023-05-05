const express = require('express');
const app = express();
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const cors = require('cors');
const config = require('./config');

mongoose.connect(config.database, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
	console.log('connected to mongo yeahhh');
});
mongoose.connection.on('error', (err) => {
	console.log('error', err);
});

app.use(express.json({ limit: '10kb' }));
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
	res.header('Access-Control-Allow-Origin', '*');
	//Quais são os métodos que a conexão pode realizar na API
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

	next();
});
app.use(cors());
app.get('/', (req, res) => {
	res.send('Bem vindo a API da RecPlaces');
});

// Importando rotas
const routes = require('./src/routes');
app.use('/api', routes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Iniciando servidor
app.listen(config.port, () => console.log('on: ' + config.port));
