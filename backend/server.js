require('dotenv').config();
const express = require('express');
const cors = require("cors");
const bancaRoutes = require("./src/routes/banca.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use(bancaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
