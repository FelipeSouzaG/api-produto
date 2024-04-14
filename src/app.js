import express from "express";
import db from "./config/dbConnect.js";
import manipulador404 from "./middlewares/manipulador404.js";
import manipuladorErro from "./middlewares/manipuladorErros.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json());
routes(app);

app.use(manipulador404);

app.use(manipuladorErro);

export default app;