const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM Categorias', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.post('/', (req, res) => {
    const { nome, descricao } = req.body;
    const query = `INSERT INTO Categorias (nome, descricao) VALUES ('${nome}', '${descricao}')`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    const query = `UPDATE Categorias SET nome = '${nome}', descricao = '${descricao}' WHERE id = ${id}`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Categorias WHERE id = ${id}`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;