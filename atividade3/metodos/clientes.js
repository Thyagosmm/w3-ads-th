const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', (req, res) => {
    const query = 'SELECT * FROM Clientes';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


router.post('/', (req, res) => {
    const { nome, email, endereco, telefone } = req.body;
    const query = `INSERT INTO Clientes (nome, email, endereco, telefone) VALUES ('${nome}', '${email}', '${endereco}', '${telefone}')`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, endereco, telefone } = req.body;
    const query = `UPDATE Clientes SET nome = '${nome}', email = '${email}', endereco = '${endereco}', telefone = '${telefone}' WHERE id = ${id}`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Clientes WHERE id = ${id}`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


module.exports = router;