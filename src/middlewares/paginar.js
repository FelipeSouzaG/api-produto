import ErroRequisicao from "../erros/ErroRequisicao.js";

async function paginar(req, res, next){
  try {
    let { limite = 5, pagina = 1, ordenacao = "_id: -1" } = req.query; // limite de listagem de livros por pagina
    let [campoOrdem, ordem] = ordenacao.split(":");
    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;

    if(limite > 0 && pagina > 0){      
      const resultadoPaginado = await resultado.find()
        .sort({ [campoOrdem]: ordem }) // filtra livros por crescente (-1 seria decrescente)
        .skip((pagina - 1) * limite) // filtra livros por quantidade limite por paginas
        .limit(limite) // filtra limite de livros por pagina
        .exec();

      res.status(200).json(resultadoPaginado);
    }else{
      next(new ErroRequisicao());
    }
  } catch (erro) {
    next(erro);
  }
}

export default paginar;
