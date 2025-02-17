const express = require('express')
const router = express.Router()
const {check} = require('express-validator')

const {createUser, loginUser, renderLogin} = require('../controllers/userController')
const {createAluno, updateSaldo, deletarAluno, mostrarTodosAlunos} = require('../controllers/alunoController')
const {createItemLanchonete, compraItemLanchonete, deletarItemLanchonete, atualizarItemLanchonete, mostrarTodasTransacoes} = require('../controllers/lanchoneteController')

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

router.get('/alunos', mostrarTodosAlunos)

router.get('/vendas', mostrarTodasTransacoes)

router.post('/cadastrar', check('email').isEmail(), createUser)
router.post('/login', loginUser)
router.post('/item', createItemLanchonete)
router.post('/aluno', createAluno)
router.post('/venda', compraItemLanchonete)

router.put('/aluno', updateSaldo)
router.put('/item', atualizarItemLanchonete)

router.delete('/item', deletarItemLanchonete)
router.delete('/aluno', deletarAluno)

module.exports = router