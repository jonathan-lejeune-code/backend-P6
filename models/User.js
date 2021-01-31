const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

//Création du modèle utilisateur
const userSchema = mongoose.Schema({
	email: {type: String, required: [true, "Veuillez entrer une adresse email"], match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Veuillez entrer une adresse email correcte"], unique: true},
	password: {type: String, required: true}
}, { autoIndex: false })

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);