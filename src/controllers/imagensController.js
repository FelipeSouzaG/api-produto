import { imagens } from "../models/Model.js";
import fs from "fs";

class ImagemController {

  static cadastrarImagem = async (req, res) => {
    try {
      const { name } = req.body;

      const file = req.file;

      let imagem = new imagens({
        name,
        src: file.path
      });

      const imagemResultado = await imagem.save();

      res.status(201).send(imagemResultado.toJSON());
    } catch (err) {
      res.status(500).json({ message: "Erro ao salvar a imagem." });
    }
  };
  
  static listarImagens = async (req, res) => {
    try {
      const pictures = await imagens.find();
      res.json(pictures);
    } catch (err) {
      res.status(500).json({ message: "Erro ao buscar as imagens." });
    }
  };
  
  static excluirImagem = async (req, res) => {
    try {
      const id = req.params.id;
      const imagem = await imagens.findByIdAndDelete(id);
      if (!imagem) {
        return res.status(404).json({ message: "Imagem não encontrada" });
      }
      fs.unlinkSync(imagem.src);
      await imagem.remove();
      res.json({ message: "Imagem removida com sucesso" });
    } catch (err) {
      res.status(500).json({ message: "Erro ao remover a imagem" });
    }      
  };

  static listarImagemPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const imagemResultado = await imagens.findById(id);

      if(imagemResultado !== null){
        res.status(200).send(imagemResultado);
      } else{
        next(new NaoEncontrado("Id da imagem não localizado."));
      }  
    } catch (erro) {
      next(erro);
    }
  };
 
};

export default ImagemController;
