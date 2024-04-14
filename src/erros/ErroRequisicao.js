import ErroBase from "./ErroBase.js";

class ErroRequisicao extends ErroBase {
  constructor(msg = "Um ou mais dados estão incorretos"){
    super(msg, 400);
  }
}

export default ErroRequisicao;