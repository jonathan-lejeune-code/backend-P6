const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const cors = require('cors'); 

const path = require('path');

// Connexion à la base de données mongoose
mongoose.connect('mongodb+srv://LJdevweb:LJ291189@clusterprojet6.ikoae.mongodb.net/ClusterProjet6?retryWrites=true&w=majority', 
{
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(()=>console.log('Connexion a mongoDB réussis !'))
.catch(()=>console.log('Connexion a mongoDB échouée !'));

const app = express();
//Définition headers CORS
app.use((req, res, next)=>{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use(bodyParser.json());

app.use(cors());

/////////////// Joining routes ///////////////////////
app.use('/api/auth', userRoutes);

module.exports = app;