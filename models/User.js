const mongoose = require('mongoose');           // importation du paquet mangoose
const uniqueValidator = require('mongoose-unique-validator');      // importation du paquet mongoose-unique-validator
const sha512 = require("crypto-js/sha512");

//Création du modèle utilisateur
const userSchema = mongoose.Schema({       // fonction Schema à qui on va passer notre Object et qui va dicter les différents champs
	email: {type: String, required: [true, "Veuillez entrer une adresse email"], match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Veuillez entrer une adresse email correcte"], unique: true},
	password: {type: String, required: true}
}, { autoIndex: false })

userSchema.plugin(uniqueValidator);        // on applique le validateur au schema pour éviter d'avoir des erreurs illisibles de MongoDB

module.exports = mongoose.model('User', userSchema);        // exportation du model terminé, en passant le nom du model et le schema