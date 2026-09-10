const sequelize = require("./config/database");
async function testarBanco() {
try {
await sequelize.authenticate();
console.log("Banco conectado!");
} catch (error) {
console.error("Erro:"

, error);

}
}
testarBanco();