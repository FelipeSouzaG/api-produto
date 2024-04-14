import express from "express";
import ImagemController from "../controllers/imagensController.js";
import uploads from "../middlewares/multer.js";

const upload = uploads;

const router = express.Router();

router.post("/imagens", upload.single("file"), ImagemController.cadastrarImagem);
router.get("/imagens", ImagemController.listarImagens);
router.get("/imagens/:id", ImagemController.listarImagemPorId);
router.delete("/imagens/:id", ImagemController.excluirImagem);



export default router;   