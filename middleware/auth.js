// authorization
const jwt = require('jsonwebtoken');

//Validation userId grâce au token
module.exports = (req, res, next) =>{
	try{
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
		const userId = decodedToken.userId;
		if(req.body.userId && req.body.userId === userId)
		{
			next();
		}else{
			throw  "Not allowed";
		}
	}catch(error){
		res.status(403).json({  error });
	}

}