const express = require('express')
const router = express.Router()
const {check} = require('express-validator')

const {createUser, loginUser, renderLogin} = require('../controllers/userController')
const {createAluno, atualizarSaldo, deletarAluno} = require('../controllers/alunoController')
const {createItemLanchonete, compraItemLanchonete, deletarItemLanchonete, atualizarItemLanchonete} = require('../controllers/lanchoneteController')

const {protectroute} = require('../middleware/usermiddleware')

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/login', renderLogin)

router.get('/adminpanel', protectroute, (req, res) => {
    res.render('adminpainel.ejs')
})

router.get('/cadastrar', (req, res) => {
    res.render('telacadastro.ejs')
})

router.post('/cadastrar', check('email').isEmail(), createUser)
router.post('/login', loginUser)
router.post('/item', createItemLanchonete)
router.post('/aluno', createAluno)
router.post('/venda', compraItemLanchonete)

router.put('/aluno', atualizarSaldo)
router.put('/item', atualizarItemLanchonete)

router.delete('/item', deletarItemLanchonete)
router.delete('/aluno', deletarAluno)

module.exports = router