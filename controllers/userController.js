const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    const {nome, email, senha} = req.body
    try {
        const senha =  await bcrypt.hash(req.body.senha, 10)
        const user = await User.create({nome, email, senha})
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const loginUser = async (req, res) => {
    const {email, senha} = req.body
    try {
        const user = await User.findOne({where: {email}})
        const isPasswordCorrect = await bcrypt.compare(senha, user.senha)
        
        if(!user){
            return res.status(404).json({error: 'Usuário não encontrado'})
        }
        if(!isPasswordCorrect){
            return res.status(401).json({error: 'Senha incorreta'})
        }
        return res.status(200).json({message: 'Usuário logado com sucesso'})
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {createUser, loginUser}