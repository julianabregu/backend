import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const PORT = 4000;
const productManager = new ProductManager("./src/products.json");

app.use(express.urlencoded({ extended: true }));

//Ruta raiz
app.get("/", (req, res) => {
  res.send("Desafio 3 Servidor con express");
});

app.get("/products", async (req, res) => {
  let { limit } = req.query;
  const products = await productManager.getProducts();

  if (limit) {
    const limitProducts = products.slice(0, limit);
    res.send(limitProducts);
  } else {
    res.send(products);
  }
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getProductById();

  if (pid) {
    res.send(product);
  } else {
    res.send(`El producto no existe`);
  }
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
