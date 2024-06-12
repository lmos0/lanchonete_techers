const express = require('express')
const router = express.Router()

const {createUser, loginUser} = require('../controllers/userController')
const {createAluno, atualizarSaldo, deletarAluno} = require('../controllers/alunoController')
const {createItemLanchonete, compraItemLanchonete, deletarItemLanchonete, atualizarItemLanchonete} = require('../controllers/lanchoneteController')

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/test', (req, res) => {
    res.send('This is a test route')
})

router.post('/cadastrar', createUser)
router.post('/login', loginUser)
router.post('/lanchonete', createItemLanchonete)
router.post('/aluno', createAluno)
router.post('/venda', compraItemLanchonete)

router.put('/aluno', atualizarSaldo)
router.put('/lanchonete', atualizarItemLanchonete)

router.delete('/lanchonete', deletarItemLanchonete)
router.delete('/aluno', deletarAluno)

module.exports = router