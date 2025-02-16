const express = require('express');
const app = express();
const session = require('express-session');
require('dotenv').config();

const router = require('./routes/router');
const adminRouter = require('./routes/adminrouter');

// Importe os modelos a partir do models/index.js
const { Aluno, ItemLanchonete, Transacao } = require('./models');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));

app.set('view engine', 'ejs');

app.use('/', router);
app.use('/user', adminRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});