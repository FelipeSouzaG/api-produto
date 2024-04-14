import NaoEncontrado from "../erros/naoEncontrado.js";
import { imagens, produtos } from "../models/Model.js";

class ProdutoController {

  static listarProdutos = async (req, res, next) => {

    try {
      const buscaProdutos = produtos.find();
      req.resultado = buscaProdutos;
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarProdutoPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const produtoResultado = await produtos.findById(id)
        .populate("imagem", "src")
        .populate("imagem2", "src")
        .populate("imagem3", "src")
        .populate("imagem4", "src")
        .populate("imagem5", "src")
        .exec();
      if(produtoResultado !== null){
        res.status(200).send(produtoResultado);
      } else{
        next(new NaoEncontrado("Id de produto não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarProduto = async (req, res, next) => {
    try {
      let produto = new produtos(req.body);

      const produtoResultado = await produto.save();

      res.status(201).send(produtoResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarProduto = async (req, res, next) => {
    try {
      const id = req.params.id;
      const produtoResultado = await produtos.findByIdAndUpdate(id, {$set: req.body});
      if(produtoResultado !== null){
        res.status(200).send({message: "produto atualizado com sucesso"});
      }else{
        next(new NaoEncontrado("Id de produto não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirProduto = async (req, res, next) => {
    try {
      const id = req.params.id;
      const produtoResultado = await produtos.findByIdAndDelete(id);
      if(produtoResultado !== null){
        res.status(200).send({message: "Produto removido com sucesso"});
      }else{
        next(new NaoEncontrado("Id de produto não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarProdutoPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if(busca !== null){
        const produtosResultado = produtos
          .find(busca)
          .populate("imagem")
          .populate("imagem2")
          .populate("imagem3")
          .populate("imagem4")
          .populate("imagem5");
        req.resultado = produtosResultado;
        next();
      }else{
        res.status(200).send([]);
      }      
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(paramBusca){
  const { nome, categoria, modelo /*, minPaginas, maxPaginas , nomeAutor*/ } = paramBusca;
  /* const regex = new RegExp(categoria, "i"); // buscar por parte de categoria */
  let busca = {};
  if(nome) busca.nome = nome;
  if(categoria) busca.categoria = categoria;
  if(modelo) busca.modelo = { $regex: modelo, $opitions: "i" }; // metodo mongoose para buscar por parte do titulo
  /*
  if(minPaginas || maxPaginas) busca.numeroPaginas = {};
  if(minPaginas) busca.numeroPaginas.$gte = minPaginas; // $gte maior ou igual em Mongoose
  if(maxPaginas) busca.numeroPaginas.$lte = maxPaginas; // $lte menor ou igual em Mongoose
  
  if(nomeAutor) {
    const autor = await imagens.findOne({ nome: nomeAutor });
    if(autor !== null){
      busca.autor = autor._id;
    }else{
      busca = null;
    }
  }
  */
  return busca;
}

export default ProdutoController;