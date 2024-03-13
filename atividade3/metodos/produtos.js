const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', (req, res) => {
    const query = 'SELECT * FROM Produtos';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.post('/', (req, res) => {
    const { nome, descricao, preco, id_categoria, disponivel } = req.body;
    const query = `INSERT INTO Produtos (nome, descricao, preco, id_categoria, disponivel) VALUES ('${nome}', '${descricao}', ${preco}, ${id_categoria}, ${disponivel})`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, id_categoria, disponivel } = req.body;
    const query = `UPDATE Produtos SET nome = '${nome}', descricao = '${descricao}', preco = ${preco}, id_categoria = ${id_categoria}, disponivel = ${disponivel} WHERE id = ${id}`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Produtos WHERE id = ${id}`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;