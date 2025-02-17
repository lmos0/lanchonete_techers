const ItemLanchonete = require('../models/ItemLanchonete');
const Aluno = require('../models/Aluno');
const Transacao = require('../models/Transacao');

// Criar um novo item na lanchonete
const createLanchoneteItem = async (req, res) => {
    const { nome, preco } = req.body;
    try {
        if (!nome || typeof nome !== 'string' || !nome.trim()) {
            return res.status(400).json({ error: 'Nome obrigatório e deve ser uma string válida' });
        }
        if (!preco || preco <= 0) {
            return res.status(400).json({ error: 'Preço obrigatório e deve ser um número positivo' });
        }

        const trimmedNome = nome.trim().toLowerCase();
        const roundedPreco = Math.round(preco * 100) / 100; // Arredonda para 2 casas decimais

        const itemExists = await ItemLanchonete.findOne({ where: { nome: trimmedNome } });
        if (itemExists) {
            return res.status(409).json({ error: 'Item já existe' });
        }

        const newItem = await ItemLanchonete.create({ nome: trimmedNome, preco: roundedPreco });
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Erro ao criar item:', error);
        res.status(500).json({ error: error.message });
    }
};

// Realizar compra de um item
const purchaseLanchoneteItem = async (req, res) => {
    const { id_aluno, id_item_lanchonete, quantidade } = req.body;
    try {
        if (quantidade <= 0) {
            return res.status(400).json({ error: 'IDs e quantidade devem ser números inteiros positivos' });
        }

        const item = await ItemLanchonete.findByPk(id_item_lanchonete);
        if (!item) return res.status(404).json({ error: 'Item não encontrado' });

        const aluno = await Aluno.findByPk(id_aluno);
        if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });

        const total = item.preco * quantidade;
        if (aluno.saldo < total) {
            return res.status(400).json({ error: 'Saldo insuficiente' });
        }

        aluno.saldo -= total;
        await aluno.save();
        await Transacao.create({ id_aluno, id_item_lanchonete, quantidade, total });

        res.status(200).json({ message: 'Compra realizada com sucesso' });
    } catch (error) {
        console.error('Erro na compra:', error);
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um item da lanchonete
const updateLanchoneteItem = async (req, res) => {
    const { id, nome, preco } = req.body;
    try {
        if (!id || !Number.isInteger(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const item = await ItemLanchonete.findByPk(id);
        if (!item) return res.status(404).json({ error: 'Item não encontrado' });

        if (nome && typeof nome === 'string') item.nome = nome.trim().toLowerCase();
        if (preco && typeof preco === 'number' && preco > 0) item.preco = Math.round(preco * 100) / 100;

        await item.save();
        res.status(200).json(item);
    } catch (error) {
        console.error('Erro ao atualizar item:', error);
        res.status(500).json({ error: error.message });
    }
};

// Deletar um item da lanchonete
const deleteLanchoneteItem = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id || !Number.isInteger(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const item = await ItemLanchonete.findByPk(id);
        if (!item) return res.status(404).json({ error: 'Item não encontrado' });

        await item.destroy();
        res.status(200).json({ message: 'Item deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar item:', error);
        res.status(500).json({ error: error.message });
    }
};

// Mostrar todas as transações
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transacao.findAll({
            include: [
                { model: Aluno, attributes: ['nome'] },
                { model: ItemLanchonete, attributes: ['nome'] }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.render('vendas', { transacoes: transactions, currentUser: req.user });
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).json({ error: error.message });
    }
};

// Mostrar todos os itens da lanchonete
const getAllLanchoneteItems = async (req, res) => {
    try {
        const itens = await ItemLanchonete.findAll();
       // res.status(200).json(items);
        res.render('itens', { itens });
    } catch (error) {
        console.error('Erro ao buscar itens:', error);
        res.status(500).json({ error: error.message });
    }
};

const renderCompraPage = async (req, res) => {
    try {
        const alunos = await Aluno.findAll();
        const itens = await ItemLanchonete.findAll();
        res.render('comprar', { alunos, itens });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createLanchoneteItem,
    purchaseLanchoneteItem,
    updateLanchoneteItem,
    deleteLanchoneteItem,
    getAllTransactions,
    getAllLanchoneteItems,
    renderCompraPage
};
