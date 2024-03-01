const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "teste",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:" + err.message);
  } else {
    console.log("Conectando ao MySQL");
  }
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/usuarios", (req, res) => {
  const sql = "select * from usuario";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Erro ao obter registros:", err.message);
      res
        .status(500)
        .json({ error: "Erro ao obter registros do banco de dados" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.post("/api/usuarios", (req, res) => {
  const { email, senha } = req.body;
  const sql = `INSERT INTO usuario (email,senha) VALUES(?,?)`;
  connection.query(sql, [email, senha], (err, result) => {
    if (err) {
      console.error("Erro ao inserir registro:", err.message);
      res
        .status(500)
        .json({ error: "Erro ao inserir registro no banco de dados" });
    } else {
      console.log("Registro inserido com sucesso!");
      res.status(201).json({ message: "Registro adicionado com sucesso" });
    }
  });
});

app.put("/api/usuarios/:id", (req, res) => {
  const id = req.params.id;
  const { email, senha } = req.body;
  const sql = "update usuario set email=?, senha=? where id=?";
  connection.query(sql, [email, Number(senha), Number(id)], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar registro:", err.message);
      res
        .status(500)
        .json({ error: "Erro ao atualizar registro no banco de dados" });
    } else {
      console.log("Registro atualizado com sucesso!");
      res.status(200).json({ message: "Registro atualizado com sucesso" });
    }
  });
});

app.delete("/api/usuarios/:id", (req, res) => {
  const id = req.params.id;

  const sql = "delete from usuario where id = ?";

  connection.query(sql, [Number(id)], (err, result) => {
    if (err) {
      console.error("Erro ao excluir registro:", err.message);
      res.status(500).json({ error: "Erro ao excluir registro no bd" });
    } else {
      if (result.affectedRows > 0) {
        console.log("Registro excluído com sucesso!");
        res.status(200).json({ message: "Registro excluído com sucesso" });
      } else {
        console.log("Registro não encontrado.");
        res
          .status(404)
          .json({ message: "Nenhum registro encontrado para excluir" });
      }
    }
  });
});

app.delete("/api/usuarios/", (req, res) => {
  const email = req.body.email;

  const sql = "delete from usuario where email = ?";
  console.log(email);
  connection.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Erro ao excluir registro:", err.message);
      res
        .status(500)
        .json({ error: "Erro ao excluir registro no banco de dados" });
    } else {
      if (result.affectedRows > 0) {
        console.log("Registro excluído com sucesso!");
        res.status(200).json({ message: "Registro excluído com sucesso" });
      } else {
        console.log("Registro não encontrado.");
        res
          .status(404)
          .json({ message: "Nenhum registro encontrado para excluir" });
      }
    }
  });
});

app.listen(port, () => {
  console.log("sistema rodando");
});
