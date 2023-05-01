require('dotenv').config();

module.exports = {
	database: process.env.DB_NAME || 'mongodb://localhost:27017/RecPlaces',
	port: process.env.APP_PORT || 3000,
};
