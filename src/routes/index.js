import express from "express";
import produtos from "./produtosRoutes.js";
import imagens from "./imagensRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({titulo: "Curso de node"});
  });

  app.use(
    express.json(),
    produtos,
    imagens
  );
};

export default routes;