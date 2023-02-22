import { Router } from "express";

const routerRealTimeProducts = Router();

routerRealTimeProducts.get("/", (req, res) => {
  res.render("realTimeProducts", {});
});

export default routerRealTimeProducts;
