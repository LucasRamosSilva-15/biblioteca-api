const { sequelize } = require("./models"); // Alterado para carregar os relacionamentos!
const express = require('express');
const app = express();
const autorRoutes = require('./routes/autorRoutes');
const livroRoutes = require('./routes/livroRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

app.use(express.json());

app.use("/api", autorRoutes);
app.use("/api", livroRoutes);
app.use("/api", categoriaRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
});

async function testarBanco() {
    try {
        await sequelize.authenticate();
        console.log("Banco conectado!");

        await sequelize.sync();
        console.log("Tabelas sincronizadas!");
    } catch (error) {
        console.error("Erro:", error);
    }
}
testarBanco();