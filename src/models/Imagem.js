import mongoose from "mongoose";

const imagemSchema = new mongoose.Schema(
  {
    name: { type: String , required: true
    },
    src: {type: String , required: [true, "Caminho do arquivo da imagem incorreto."]}
  }
);

const imagens = mongoose.model("imagens", imagemSchema);

export default imagens;