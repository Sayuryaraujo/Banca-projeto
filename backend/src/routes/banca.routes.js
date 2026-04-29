const express = require("express");
const router = express.Router();

const bancaController = require("../controllers/banca.controllers");

router.post("/cadastrar", bancaController.cadastrar);
router.get("/listar", bancaController.listar);
router.get("/buscar/:id", bancaController.buscar);
router.put("/atualizar/:id", bancaController.atualizar);
router.delete("/excluir/:id", bancaController.excluir);

module.exports = router;