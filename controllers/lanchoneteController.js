const ItemLanchonete = require('../models/ItemLanchonete')
const Aluno = require('../models/Aluno')
const Transacao = require('../models/Transacao')

const createItemLanchonete = async (req, res) => {
    const {nome,preco} = req.body
    try {
        const itemLanchonete = await ItemLanchonete.create({nome,preco})
        res.status(201).json(itemLanchonete)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const compraItemLanchonete = async (req, res) => {
    const {id_aluno, id_item_lanchonete, quantidade} = req.body
    try {
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

module.exports = {createItemLanchonete, compraItemLanchonete, deletarItemLanchonete, atualizarItemLanchonete}
