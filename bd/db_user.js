const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'aluno',
    passsword: 'ifpecjbg',
    database: 'seu_banco_de_dados'
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'aluno',
    passsword: 'ifpecjbg',
    database: 'nome_do_banco_de_dados'
});

connection.connect((err) =>{
    if(err){
        console.error('Erro ao conectar ao MySQL: ' + err.message);
    }
    else{
        console.log('Conectado ao MySQL');
    }
});

db.connect(err =>{
    if(err){
        console.error('Erro ao conectar ao MySQL: ', err);
    }
    else{
        console.log('Conectado ao MySQL');
    }
});

app.post('api/usuarios', (req,res) =>{
    const {email, senha} = req.body;

    const sql = 'INSERT INTO usuario (email, senha) VALUES (?,?)';
    connection.query(sql, [email, senha], (err, result) =>{
        if(err){
            console.error('Erro ao inserir registro: ' + err.message);
            res.status(500).json({error:'Erro ao inserir registro'});
        }
        else{
            console.log('Registro inserido com sucesso!');
            res.status(201).json({ message: 'Registro inserido com sucesso'});
        }
    });
});

app.get('/api/usuarios', (req,res) =>{
    const sql = 'SELECT * FROM usuario';
    connection.query(sql,(err,results)=>{
        if(err){
            console.error('Erro ao buscar registros' + err.message);
            res.status(500).json({error: 'Erro ao buscar registros'});
        }
        else{
            res.status(200).json(results);
        }
    })
})

app.put('/api/usuarios/:id', (req, res) => {
    const {id} = req.params;
    const {email, senha} = req.body;

    const sql = 'UPDATE usuario SET email = ?, senha = ? WHERE id = ?';
    connection.query(sql, [email, senha, id], (err, result) => {
        if(err){
            console.error('Erro ao atualizar registro: ' + err.message);
        }
        else{
            console.log('Registro atualizado com sucesso!');
            res.status(200).json({message: 'Registro atualizado com sucesso'});
        }
    });
});


app.delete('/api/usuarios/:id', (req,res) =>{
    const {id} = req.params;

    const sql = 'DELETE FROM usuario WHERE id = ?';
    connection.query(sql, [id], (err, result) =>{
        if(err){
            console.error('Erro ao excluir registro: ' + err.message);
            res.status(500).json({error: 'Erro ao excluir registro'});
        }
        else{
            if (result.affectedRows > 0) {
                console.log('Registro excluido com sucesso!');
                res.status(200).json({message: 'Registro excluido com sucesso'});
            }
            else{
                console.log('Registro não encontrado.');
                res.status(404).json({message: 'Registro não encontrado'});
            }
        }
    });
});

module.exports = {
    connection,
    db,
    app
};