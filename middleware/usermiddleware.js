const express = require('express')
const session = require('express-session')
const app = express()

const protectroute = (req, res, next) => {
    if(req.session.user){
        next()
    }else{
        res.status(401).json({error: 'Faça login para acessar essa página'})
    }
}

module.exports = {protectroute}