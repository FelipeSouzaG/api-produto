import ErroRequisicao from "./ErroRequisicao.js";

class ErroValidacao extends ErroRequisicao {
  constructor(erro){
    const msgErro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");
    super(`Erro encontrado: ${msgErro}`);
  }
}

export default ErroValidacao;
