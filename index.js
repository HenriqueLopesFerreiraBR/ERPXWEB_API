// index.js
const express = require('express');
const sequelize = require('./src/sequelize-config');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()


const routes = require('./src/routes/indexRoutes'); // Importando as rotas combinadas


const app = express();
const port = 3005;

app.use(express.json()); // Para parsear JSON
app.use('/api', routes);  // Usar todas as rotas em '/api'

// Inicializando conexão com o banco de dados
sequelize.sync().then(() => {
  console.log('Database connected');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
