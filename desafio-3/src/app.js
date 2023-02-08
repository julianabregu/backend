import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const PORT = 8080;
const productManager = new ProductManager("./src/products.json");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Desafio 3 Servidor con express");
});

app.get("/products", async (req, res) => {
  let { limit } = req.query;
  let products = await productManager.getProducts();

  if (limit) {
    const limitP = products.slice(0, limit);
    res.send(limitP);
  } else {
    res.send(products);
  }
});

app.get("/products/:pid", async (req, res) => {
  let { pid } = req.params;
  const getById = await productManager.getProductById(parseInt(pid));

  if (getById) {
    res.send(getById);
  } else {
    res.send(`This product does not exist.`);
  }
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
