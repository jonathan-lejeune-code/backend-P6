//Création du serveur
const http = require('http');   // Importation du package http de node (permet de creer un serveur)
const app = require('./app');   // Importation de app.js

//Renvoi d'un port valide
const normalizePort = val => {
	const port = parseInt(val, 10);
	if(isNaN(port))
	{
		return val;
	}
	if(port >= 0)
	{
		return port;
	}

	return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port); // Port utilisé par l'application express

//Gérer les erreurs
const errorHandler = error => {
	if(error.syscall !== "listen")
	{
		throw error;
	}
	const address = server.address();
	const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

	switch (error.code)
	{
		case 'EACCES':
			console.error(bind + ' required elevated privileges.');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
};
const server = http.createServer(app);  // L'application créée par express est une fonction qui va recevoir la requête et la réponse

server.on('error', errorHandler);
server.on('listening', ()=>{
	const address = server.address();
	const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
	console.log('Listening on' + bind);
})

server.listen(port); // Le serveur attend les requêtes au port 3000