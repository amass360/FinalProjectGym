const jwt = require('jsonwebtoken')
require('dotenv').config()

const {ACCESS_TOKEN_SECRET} = process.env;

const verifyToken = (req,res,next) => {
    const token = req.cookies['token'] || req.headers['x-access-token']
    console.log('############### verify ###########');
    
    console.log(req.cookies,req.headers);
    
    if(!token) return res.status(401).json({message:'unauthorized'})

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err,decoded) => {
        if(err) 
            return res.status(401).json({message:'forbidden', error:err.message});
        const { userid, email } = decoded;
        /** validation ->  */

        req.userid = userid;
        req.email = email;

        next();
    })
};

module.exports = {
    verifyToken
}