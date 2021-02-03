const express = require('express');      // importation du paquet express
const helmet = require ('helmet');       // importation du paquet helmet
const bodyParser = require('body-parser');// importation du paquet body-parser
const mongoose = require('mongoose');   // importation du paquet mongoose
const userRoutes = require('./routes/user');  // importation du router user
const sauceRoutes = require('./routes/sauce');  // importation du router sauce
const cors = require('cors'); 

const path = require('path');    // importation du paquet node "path" qui donne accès au chemin du système de fichier

// Connexion à la base de données mongoose
mongoose.connect('mongodb+srv://LJdevweb:LJ291189@clusterprojet6.ikoae.mongodb.net/ClusterProjet6?retryWrites=true&w=majority', 
{
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(()=>console.log('Connexion a mongoDB réussis !'))
.catch(()=>console.log('Connexion a mongoDB échouée !'));

const app = express();     // Création de l'application express


//Définition headers CORS
app.use((req, res, next)=>{       // middleware général appliqué à toute les requêtes (CORS)
	res.setHeader('Access-Control-Allow-Origin', '*');     // autorisation d'acceder à notre API
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');     //  autorisation d'utiliser certains headers
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');     // autorisation d'utiliser certaines méthodes
	next();
});

app.use(bodyParser.json());  // transforme le corps de la requête en objet javascript utilisable
app.use(helmet())

app.use(cors());

/////////////// Joining routes ///////////////////////
app.use('/api/auth', userRoutes);    // pour cette route la, on utilise le router userRoutes
app.use('/images', express.static(path.join(__dirname, 'images')));  // middleware spécifique qui permet de servir le dossier image lors d'une requête spécifique avec l'image
app.use('/api/sauces', sauceRoutes);      // pour cette route la, on utilise le router sauceRoutes

module.exports = app;   // Exportation de l'application pour y accéder à partir des autres fichiers