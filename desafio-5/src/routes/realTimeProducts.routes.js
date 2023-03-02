import { Router } from "express";

const routerRealTimeProducts = Router();

routerRealTimeProducts.get("/", async (req, res) => {
  res.render("realTimeProducts", {});
});

export default routerRealTimeProducts;
