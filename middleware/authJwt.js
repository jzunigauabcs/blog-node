const jwt = require('jsonwebtoken');
const {SECRET} = require('../config/secret')

const extracToken = (req) => {
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        return req.headers.authorization.split(' ')[1]
    return null
}

const verifyToken = (req, res, next) => {
    const token = extracToken(req);
    if(!token) {
        console.log('Entró')
        return res.status(400).send('Token not found')
    } 
    jwt.verify(token, SECRET, (err, decoded) => {
        if(err)
            res.status(400).send('Invalid token')
        req.userId = decoded.userId
        next()
    })
}

module.exports = {
    verifyToken: verifyToken
}