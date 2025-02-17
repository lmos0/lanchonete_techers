const ItemLanchonete = require('../models/ItemLanchonete')
const Aluno = require('../models/Aluno')
const Transacao = require('../models/Transacao')

const createItemLanchonete = async (req, res) => {
    const {nome,preco} = req.body
    try {
        if(!nome || !preco){
            return res.status(400).json({error: 'Nome e preço são obrigatórios'})
        }

        if(typeof nome !== 'string' || typeof preco !== 'number'){
            return res.status(400).json({error: 'Nome deve ser uma string e preço um número'})
        }

        if(preco <= 0){
            return res.status(400).json({error: 'Preço deve ser um número positivo'})
        }

        const trimmedNome = nome.trim().toLocaleLowerCase()
        const roundedPreco = Math.round(preco * 100) / 100 //arredonda para 2 casas decimais

        const itemExists = await ItemLanchonete.findOne({where: {nome: trimmedNome}})

        if (itemExists){
            return res.status(409).json({error: 'Item já existe'})
        }

        const itemLanchonete = await ItemLanchonete.create({nome,preco})
        res.status(201).json(itemLanchonete)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const compraItemLanchonete = async (req, res) => {
    const {id_aluno, id_item_lanchonete, quantidade} = req.body
    try {

        //input validation
        if (!Number.isInteger(id_aluno) || !Number.isInteger(id_item_lanchonete) || !Number.isInteger(quantidade)){
            return res.status(400).json({error: 'id_aluno, id_item_lanchonete e quantidade devem ser números inteiros'})
        }

        if (quantidade <= 0){
            return res.status(400).json({error: 'Quantidade deve ser um número positivo'})
        }

        const itemLanchonete = await ItemLanchonete.findByPk(id_item_lanchonete)
        if(!itemLanchonete){
            return res.status(404).json({error: 'Item não encontrado'})
        }
        


        const total = itemLanchonete.preco * quantidade
        const aluno = await Aluno.findByPk(id_aluno)
        if(!aluno){
            return res.status(404).json({error: 'Aluno não encontrado'})
        }
        if(aluno.saldo < total){
            return res.status(400).json({error: 'Saldo insuficiente'})
        }
        aluno.saldo -= total
        await aluno.save()
        await Transacao.create({id_aluno, id_item_lanchonete, quantidade, total})
        res.status(200).json({message: 'Compra realizada com sucesso'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deletarItemLanchonete = async (req, res) => {
    const {nome} = req.body
    try {
        const itemLanchonete = await ItemLanchonete.findOne({where: {nome}})
        if(!itemLanchonete){
            return res.status(404).json({error: 'Item não encontrado'})
        }
        await itemLanchonete.destroy()
        res.status(200).json({message: 'Item deletado com sucesso'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const atualizarItemLanchonete = async (req, res) => {
    const {id, nome, preco} = req.body
    try {
        const itemLanchonete = await ItemLanchonete.findByPk(id)
        if(!itemLanchonete){
            return res.status(404).json({error: 'Item não encontrado'})
        }
        itemLanchonete.nome = nome
        itemLanchonete.preco = preco
        await itemLanchonete.save()
        res.status(200).json(itemLanchonete)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const mostrarTodasTransacoes = async (req, res) => {
    try {
        const transacoes = await Transacao.findAll()
        res.status(200).json(transacoes)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const mostrarTodosItensLanchonete = async (req, res) => {
    try {
        const itensLanchonete = await ItemLanchonete.findAll()
        res.status(200).json(itensLanchonete)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


module.exports = {createItemLanchonete, compraItemLanchonete, deletarItemLanchonete, atualizarItemLanchonete, mostrarTodasTransacoes, mostrarTodosItensLanchonete }
