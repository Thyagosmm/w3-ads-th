const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    const query = 'SELECT * FROM Pedidos';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.post('/', (req, res) => {
    const { id_cliente, data_pedido, status } = req.body;
    const query = `INSERT INTO Pedidos (id_cliente, data_pedido, status) VALUES (${id_cliente}, '${data_pedido}', '${status}')`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_cliente, data_pedido, status } = req.body;
    const query = `UPDATE Pedidos SET id_cliente = ${id_cliente}, data_pedido = '${data_pedido}', status = '${status}' WHERE id = ${id}`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Pedidos WHERE id = ${id}`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;