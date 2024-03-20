const Sequelize = require('sequelize');

const sequelize = new Sequelize('atividade4', 'aluno', 'ifpecjbg', {
dialect: 'mysql', 
host: 'localhost', 
});

sequelize.authenticate()
.then(() => {
console.log('Conexão bem-sucedida com o banco de dados.');
})
.catch(err => {
console.error('Erro ao conectar ao banco de dados:', err);
});

const Categoria = sequelize.define('Categoria',{
    nome: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: true
    }
})

const Produto = sequelize.define('Produto',{
    nome:{
        type: Sequelize.STRING(255),
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    preco:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
    },
    id_categoria:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    disponivel:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
})
Produto.belongsTo(Categoria, {
    foreignKey: 'id_categoria',
    as: 'categoria'
});

const Cliente = sequelize.define('Cliente',{
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    endereco:{
        type: Sequelize.STRING(255),
        allowNull: false
    },
    telefone:{
        type: Sequelize.STRING(20),
        allowNull: false
    }
})
const Pedido = sequelize.define('Pedido',{
    id_cliente:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    data_pedido:{
        type: Sequelize.DATE,
        allowNull: false
    },
    status:{
        type: Sequelize.STRING(50),
        allowNull: false
    }
})
Pedido.belongsTo(Cliente, {
    foreignKey: 'id_cliente',
    as: 'cliente'
});

const ItensPedido = sequelize.define('ItensPedido',{
    id_pedido:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_produto:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantidade:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    preco_unitario:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
    }

})

ItensPedido.belongsTo(Pedido, {
    foreignKey: 'id_pedido',
    as: 'pedido'
});
ItensPedido.belongsTo(Produto, {
    foreignKey: 'id_produto',
    as: 'produto'
});

sequelize.sync()
    .then(() =>{
    console.log('Modelos sincronizados com o banco de dados.');
    })
    .catch(err =>{
    console.error('Erro ao sincronizar modelos:', err);
    });

module.exports = {
    sequelize,
    Categoria,
    Produto,
    Cliente,
    Pedido,
    ItensPedido
};