const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const db = require('./db');
const app = express();
app.use(bodyParser.json());

//importando metodos de categorias
const categorias = require('./metodos/categorias');
app.use('/categorias', categorias);

//importando metodos de produtos
const produtos = require('./metodos/produtos');
app.use('/produtos', produtos);

//importando metodos de clientes
const clientes = require('./metodos/clientes');
app.use('/clientes', clientes);

//importando metodos de itenspedido
const itenspedido = require('./metodos/itenspedido');
app.use('/itenspedido', itenspedido);

//importando metodos de pedidos
const pedidos = require('./metodos/pedidos');
app.use('/pedidos', pedidos);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
