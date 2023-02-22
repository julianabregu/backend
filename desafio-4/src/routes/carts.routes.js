import { Router } from "express";
import CartManager from "../controllers/cartManager.js";

const routerCart = Router();
const cartManager = new CartManager("src/models/carts.json");

routerCart.post("/", async (req, res) => {
  let newCart = await cartManager.addCart(req.body);

  res.send(newCart);
});

routerCart.get("/:cid", async (req, res) => {
  let { cid } = req.params;
  const getById = await cartManager.getCartById(parseInt(cid));

  res.send(getById);
});

routerCart.post("/:cid/product/:pid", async (req, res) => {
  let addToCart = await cartManager.addToCart(req.body);

  res.send(addToCart);
});

export default routerCart;
