const express = require('express')
const app = express()
const session = require('express-session')

require('dotenv').config()

const router = require('./routes/router')
const adminRouter = require('./routes/adminrouter')
const sequelize = require('./database/db')

const User = require('./models/User')
const ItemLanchonete = require('./models/ItemLanchonete')
const Aluno = require('./models/Aluno')
const Transacao = require('./models/Transacao')



app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))
app.use(session({secret: process.env.SECRET, resave:false, saveUninitialized: false}))


app.set('view engine', 'ejs')

app.use('/', router)
app.use('/user', adminRouter)


Transacao.belongsTo(Aluno, {foreignKey: 'id_aluno'})
Transacao.belongsTo(ItemLanchonete, {foreignKey: 'id_item_lanchonete'})



sequelize.sync()
    .then(() => {
        console.log('Database connected')
    })
    .catch((error) => {
        console.log(error)
    })


app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
    })
