const Aluno = require('../models/Aluno')

const createAluno = async (req, res) => {
    const {nome,saldo} = req.body
    try {
        const aluno = await Aluno.create({nome,saldo})
        res.status(201).json(aluno)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const atualizarSaldo = async (req,res) => {
    const {id, saldo} = req.body
    try {
        const aluno = await Aluno.findByPk(id)
        aluno.saldo = saldo
        await aluno.save()
        res.status(200).json(aluno)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deletarAluno = async (req, res) => {
    const {nome} = req.body
    try {
        const aluno = await Aluno.findOne({where: {nome}})
        if(!aluno){
            return res.status(404).json({error: 'Aluno não encontrado'})
        }
        await aluno.destroy()
        res.status(200).json({message: 'Aluno deletado com sucesso'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {createAluno, atualizarSaldo, deletarAluno}