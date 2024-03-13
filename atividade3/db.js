const mysql2 = require('mysql2');

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'aluno',
    password: 'ifpecjbg',
    database: 'atividade3'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados!');
});

module.exports = db;
