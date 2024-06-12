const express = require('express')
const adminRouter = express.Router()

const {createUser, loginUser} = require('../controllers/userController')
const {createAluno} = require('../controllers/alunoController')

adminRouter.get('/testando', (req, res) => {
    res.send('Hello World!')
}
)

module.exports = adminRouter
