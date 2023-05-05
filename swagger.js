const swaggerAutogen = require('swagger-autogen')();

const documentation = {
	info: {
		version: '1.0.0',
		title: 'API RecPlaces',
		description:
			'A API do RecPlaces é uma ferramenta essencial para o funcionamento do aplicativo RecPlaces, que tem como objetivo promover a divulgação e a valorização das áreas do Recife Antigo. A API permite que os desenvolvedores do aplicativo possam buscar e fornecer informações sobre os locais turísticos, culturais e históricos do bairro, além de possibilitar a interação dos usuários com o aplicativo.',
	},
	host: 'localhost:4000/api',
};

const outputFile = './swagger-output.json';
const endpointsFile = ['./src/routes.js'];

swaggerAutogen(outputFile, endpointsFile, documentation).then(() => {
	require('./index');
});
