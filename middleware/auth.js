// authorization
const jwt = require('jsonwebtoken');  // importation du paquet jwt

//Validation userId grâce au token
module.exports = (req, res, next) =>{
	try{                                                                     // on utilise try/catch car plusieurs éléments peuvent poser problème
		const token = req.headers.authorization.split(' ')[1];               // on récupère uniquement le token du header de la requête
		const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');       // on décode le token avec la fonction verify qui prend le token et la clé secrète
		const userId = decodedToken.userId;                                  // on récupère le userId du token décodé
		if(req.body.userId && req.body.userId !== userId)                    // si on optient bien un userId et que celui-ci est différent du userId
		{ 
			throw 'Invalid user ID';                                          // on renvoi l'erreur
		}else{
			next();                                                          // sinon on appelle next car la validation est un succès
		}
	}catch(error){
		res.status(403).json({  error });                                     // si une erreur est reçu on l'affiche, sinon on affiche le message personnalisé
	}

};