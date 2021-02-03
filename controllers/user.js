const bcrypt = require('bcrypt');  // importation du paquet bcrypt

const User = require('../models/User');   // importation du model User

const jwt = require('jsonwebtoken');    // importation du paquet jwt

const sha512 = require("crypto-js/sha512");  // importation du cryptage 


// Création de nouveaux utilisateurs (POST)
exports.signup = (req, res, next) => {
	//Hash du mot de passe
	bcrypt.hash(req.body.password, 10)        // fonction asynchrone pour hasher le mot de passe
	.then(hash => {                             // on récupère le hash de mot de passe
		//Création du nouvel utilisateur
		const user = new User({
			email: req.body.email,
			password: hash                   // on enregistre le mot de passe hashé
		})
		 //Sauvegarde de l'utilisateur dans la base de données
		user.save()    // on enregistre l'utilisateur dans la base de donnée
		.then(()=>res.status(201).json({message: "Utilisateur crée !"}))
		.catch(error => res.status(400).json({ error }))
	})
	.catch(error => {console.error(error); res.status(500).json({ error })})
};
//Connexion d'utilisateurs déjà enregistrés dans la base de données
exports.login = (req, res, next) => {
	User.findOne({email: req.body.email})   // on récupère l'utilisateur de la base qui correspond a l'adresse mail entrée
	.then(user=>{
		if(!user)                      // si on ne reçoit pas d'utilisateur
		{
			return res.status(401).json({error: "Utilisateur non trouvé !"});  
		}
		//Comparaison mot de passe requête/base de données
		bcrypt.compare(req.body.password, user.password)
		.then( valide => {
			if(!valide)   // si la comparaison n'est pas bonne
			{
				return res.status(401).json({error: "Mot de passe incorrect !"});          // on renvoi une erreur
			}
			res.status(200).json({         // mais si la comparaison est bonne
				userId: user._id,          // on renvoi son UserId
				token: jwt.sign(            // fonction sign qui prend des arguments les données que nous allons encoder à l'intérieur du token
					{userId: user._id},     // création d'un objet avec le UserId pour être sur de la correspondance
					'RANDOM_TOKEN_SECRET',  // clé secrète pour l'encodage
					{expiresIn: '24h'}        // configuration de l'expiration du token
				)
			});
		})
		.catch(error => res.status(500).json({ error }));
	})
	.catch(error => res.status(500).json({ error }));
};