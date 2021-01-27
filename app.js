const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const path = require('path');


mongoose.connect('mongodb+srv://root:<password>@cluster0.wvn0x.mongodb.net/test?retryWrites=true&w=majority', 
{
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(()=>console.log('Connexion à mongoDB réussis !'))
.catch(()=>console.log('Connexion à mongoDB échouée !'));

const app = express();

app.use((req, res, next)=>{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use(bodyParser.json());

/////////////// Joining routes ///////////////////////
app.use('/api/auth', userRoutes);

module.exports = app;