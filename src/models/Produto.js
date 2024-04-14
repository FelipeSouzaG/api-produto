import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {
      type: String,
      required: [true, "O Nome do produto deve ser preenchido"]
    },
    categoria: {
      type: String,
      required: [true, "A Categoria do produto deve ser preenchida"]
    },
    modelo: {
      type: String,
      required: [true, "O Modelo do produto deve ser preenchida"]
    },
    especificacao: {
      type: String,
      required: [true, "A especificação do produto deve ser preenchida"]
    },
    quantidade: {
      type: Number,
      required: [true, "A quantidade do produto deve ser preenchida"]
    },
    valor: {
      type: Number,
      required: [true, "O valor do produto deve ser preenchido"]
    },
    imagem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "imagens",
      required: [true, "Imagem principal do Produto deve ser preenchido"]
    },
    imagem2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "imagens",
      required: [true, "Imagem secundaria (imagem 2) do Produto deve ser preenchido"]
    },
    imagem3: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "imagens"
    },
    imagem4: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "imagens"
    },
    imagem5: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "imagens"
    }
  }
);


const produtos= mongoose.model("produtos", produtoSchema);

export default produtos;