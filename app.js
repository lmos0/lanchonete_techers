const express = require('express')
const app = express()
require('dotenv').config()
const router = require('./routes/router')
const adminRouter = require('./routes/adminrouter')
const sequelize = require('./database/db')

const User = require('./models/User')
const ItemLanchonete = require('./models/ItemLanchonete')
const Aluno = require('./models/Aluno')

app.use(express.json())
app.use(express.static('public'))

app.use('/', router)
app.use('/user', adminRouter)



sequelize.sync()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
    })
