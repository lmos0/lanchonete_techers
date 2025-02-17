const Aluno = require('../models/Aluno');

const createAluno = async (req, res) => {
    try {
        const { nome, saldo, responsavel } = req.body;

        // Input validation
        if (!nome || typeof nome !== 'string' || !nome.trim()) {
            return res.status(400).json({ error: 'Nome obrigatório e deve ser uma string válida' });
        }

        if (!responsavel || typeof responsavel !== 'string' || !responsavel.trim()) {
            return res.status(400).json({ error: 'Campo responsável obrigatório e deve ser uma string válida' });
        }

        if (saldo === undefined || saldo < 0) {
            return res.status(400).json({ error: 'Saldo obrigatório e deve ser um número positivo' });
        }

        // Sanitize input
        const trimmedNome = nome.trim();
        const trimmedResponsavel = responsavel.trim();
        const parsedSaldo = parseFloat(saldo);

        // Check if aluno already exists
        const alunoExists = await Aluno.findOne({ where: { nome: trimmedNome } });
        if (alunoExists) {
            return res.status(400).json({ error: 'Aluno já existe' });
        }

        const aluno = await Aluno.create({ nome: trimmedNome, saldo: parsedSaldo, responsavel: trimmedResponsavel });
        return res.status(201).json(aluno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAluno = async (req, res) => {
    try {
        const { id, nome, responsavel } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'ID do aluno é obrigatório' });
        }

        const aluno = await Aluno.findByPk(id);
        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }

        if (nome && typeof nome === 'string') aluno.nome = nome.trim();
        if (responsavel && typeof responsavel === 'string') aluno.responsavel = responsavel.trim();

        await aluno.save();
        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateSaldoAluno = async (req, res) => {
    try {
        const { id, saldo } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'ID do aluno é obrigatório' });
        }

        if (saldo === undefined || !Number.isFinite(saldo) || saldo < 0) {
            return res.status(400).json({ error: 'Saldo obrigatório e deve ser um número positivo' });
        }

        const aluno = await Aluno.findByPk(id);
        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }

        aluno.saldo = parseFloat(saldo);
        await aluno.save();
        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAluno = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'ID do aluno é obrigatório' });
        }

        const aluno = await Aluno.findByPk(id);
        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }

        await aluno.destroy();
        res.status(200).json({ message: 'Aluno deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.findAll();
        res.render('alunos', { alunos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createAluno, updateSaldoAluno, deleteAluno, updateAluno, getAllAlunos };
