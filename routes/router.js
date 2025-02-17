const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

// Controllers
const { createUser, loginUser, renderLogin } = require('../controllers/userController');
const { createAluno, updateSaldoAluno, deleteAluno, getAllAlunos } = require('../controllers/alunoController');
const {
    createLanchoneteItem,
    purchaseLanchoneteItem,
    deleteLanchoneteItem,
    updateLanchoneteItem,
    getAllTransactions,
    getAllLanchoneteItems,
    renderCompraPage
} = require('../controllers/lanchoneteController');

// Middleware
const { protectRoute } = require('../middleware/usermiddleware');

// Main Routes
router.get('/', (req, res) => res.send('Hello World!'));
router.get('/login', renderLogin);
router.get('/admin', protectRoute, (req, res) => res.render('adminpainel.ejs'));

// Aluno Routes
router.get('/alunos', getAllAlunos);
router.get('/alunos/registro', (req, res) => res.render('cadastro_alunos.ejs'));
router.post('/alunos', createAluno);
router.put('/alunos/:id/saldo', updateSaldoAluno);
router.delete('/alunos/:id', deleteAluno);

// Lanchonete Routes
router.get('/lanchonete/transacoes', getAllTransactions);
router.get('/lanchonete/itens', getAllLanchoneteItems);
router.get('/lanchonete/itens/novo', (req, res) => res.render('additem.ejs'));
router.post('/lanchonete/itens', createLanchoneteItem);
router.post('/lanchonete/compras', purchaseLanchoneteItem);
router.put('/lanchonete/itens/:id', updateLanchoneteItem);
router.delete('/lanchonete/itens/:id', deleteLanchoneteItem);
router.get('/lanchonete/compras/novo', renderCompraPage);

// User Routes
router.post('/usuarios', check('email').isEmail(), createUser);
router.post('/usuarios/login', loginUser);

//compras


module.exports = router;
