import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const productManager = new ProductManager("src/models/products.json");

const routerHome = Router();

routerHome.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products });
});

export default routerHome;
