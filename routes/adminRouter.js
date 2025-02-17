const express = require('express')
const adminRouter = express.Router()

const {createUser, loginUser, showUsers} = require('../controllers/userController')

adminRouter.get('/testando', (req, res) => {
    res.send('Hello World!')
}
)

adminRouter.get('/login', (req, res) => {
    res.render('telalogin.ejs')
})



adminRouter.get('/adminpanel', (req, res) => {
    res.render('adminpainel.ejs')
})

adminRouter.get('/users', showUsers)

adminRouter.post('/user', createUser)

adminRouter.post('/login', loginUser)



module.exports = adminRouter
