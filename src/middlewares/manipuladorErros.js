import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import ErroRequisicao from "../erros/ErroRequisicao.js";


// eslint-disable-next-line no-unused-vars
function manipuladorErro(erro, req, res, next) {
  if(erro instanceof mongoose.Error.CastError){
    new ErroRequisicao().enviarResposta(res);
  } else if(erro instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(erro).enviarResposta(res);
  } else if(erro instanceof ErroBase){
    erro.enviarResposta(res);
  }else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorErro;