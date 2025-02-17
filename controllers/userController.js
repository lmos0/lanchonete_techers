const express = require('express')
//const {validationResult} = require('express-validator')

const User = require('../models/User')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    const {nome, email, senha, confirmarSenha} = req.body
    try {
        if(req.body.senha !== confirmarSenha){
            return res.status(400).json({error: 'Senhas não conferem'})
        }
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
        //res.render('telalogin.ejs')
       //return res.status(200).json({message: 'Usuário logado com sucesso'})
        req.session.user = user
       return res.redirect('/adminpanel')
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const renderLogin = (req, res) => {
    res.render('telalogin.ejs')
}

const showUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}



module.exports = {createUser, loginUser, renderLogin, showUsers}