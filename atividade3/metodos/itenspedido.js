const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    const query = 'SELECT * FROM ItensPedido';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.post('/', (req, res) => {
    const { id_pedido, id_produto, quantidade, preco_unitario } = req.body;
    const query = `INSERT INTO ItensPedido (id_pedido, id_produto, quantidade, preco_unitario) VALUES (${id_pedido}, ${id_produto}, ${quantidade}, ${preco_unitario})`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_pedido, id_produto, quantidade, preco_unitario } = req.body;
    const query = `UPDATE ItensPedido SET id_pedido = ${id_pedido}, id_produto = ${id_produto}, quantidade = ${quantidade}, preco_unitario = ${preco_unitario} WHERE id = ${id}`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM ItensPedido WHERE id = ${id}`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;