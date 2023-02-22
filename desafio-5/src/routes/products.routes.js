import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const routerProduct = Router();
const productManager = new ProductManager("src/models/products.json");

routerProduct.get("/", async (req, res) => {
  let { limit } = req.query;
  let products = await productManager.getProducts();

  if (limit) {
    const limitP = products.slice(0, limit);
    res.send(limitP);
  } else {
    res.send(products);
  }
});

routerProduct.get("/:pid", async (req, res) => {
  let { pid } = req.params;
  const getById = await productManager.getProductById(parseInt(pid));

  res.send(getById);
});

routerProduct.post("/", async (req, res) => {
  let newProduct = await productManager.addProduct(req.body);

  res.send(newProduct);
});

routerProduct.put("/:pid", async (req, res) => {
  let updateById = await productManager.updateProduct(req.params.pid, req.body);
  res.send(updateById);
});

routerProduct.delete("/:pid", async (req, res) => {
  let { pid } = req.params;
  let deleteById = await productManager.deleteProductById(parseInt(pid));

  res.send(deleteById);
});

export default routerProduct;
