const express = require('express')
const adminRouter = express.Router()

const {createUser, loginUser, showUsers} = require('../controllers/userController')

adminRouter.get('/testando', (req, res) => {
    res.send('Hello World!')
}
)

adminRouter.get('/users', showUsers)

adminRouter.post('/user', createUser)

module.exports = adminRouter
