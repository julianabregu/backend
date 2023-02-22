import { Router } from "express";
import products from "../models/products.json" assert { type: "json" };

const routerHome = Router();

routerHome.get("/", (req, res) => {
  res.render("home", {
    title: "products",
    products,
  });
});

export default routerHome;
