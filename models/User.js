const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

//Création du modèle utilisateur
const userSchema = mongoose.Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true}
}, { autoIndex: false })

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);