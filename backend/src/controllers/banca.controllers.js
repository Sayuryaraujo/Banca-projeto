const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
  try {
    const { nome, categoria, preco, imagem, classificacao } = req.body;

    const banca = await prisma.banca.create({
      data: {
        nome,
        categoria,
        preco: Number(preco),
        imagem,
        classificacao,
      },
    });

    if (!banca) {
      throw new Error("Erro ao cadastrar produto");
    }

    res.json(banca).status(201).end();
  } catch (error) {
    res.json({ error: error.message }).status(500).end();
  }
};

const listar = async (req, res) => {
  try {
    const lista = await prisma.banca.findMany();
    res.json(lista).status(200).end();
  } catch (error) {
    res.json({ error: error.message }).status(500).end();
  }
};

const buscar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const banca = await prisma.banca.findUnique({
      where: { id },
    });

    if (!banca) {
      return res.status(404).json({ erro: "Produto não encontrada" });
    }

    res.json(banca).status(200).end();
  } catch (error) {
    res.json({ error: error.message }).status(500).end();
  }
};

const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;

    const banca = await prisma.banca.update({
      where: { id: Number(id) },
      data: dados,
    });

    res.json(banca).status(200).end();
  } catch (error) {
    res.status(404).json({ error: "Produto não encontrada" });
  }
};

const excluir = async (req, res) => {
  try {
    const { id } = req.params;

    const banca = await prisma.banca.delete({
      where: { id: Number(id) },
    });

    res.json(banca).status(200).end();
  } catch (error) {
    res.status(404).json({ error: "Produto não encontrada" });
  }
};

module.exports = {
  cadastrar,
  listar,
  buscar,
  atualizar,
  excluir,
};