const jwt= require('jsonwebtoken')
const config = require('../config/custom-environment-variables.json')

const verifyToken=(req,res,next)=>{
    let token = req.headers['x-auth-token']

    if(!token) {
        return res.status(403).send({
            message: "No token provided",
        })
    }

    jwt.verify(token, config.jwtPrivateKey, (err, decoded) => {
        if(err) return res.status(500).send({message: "Failed to authenticate token"})

        req.userId = decoded.id
        next()
    })
}

module.exports = verifyToken