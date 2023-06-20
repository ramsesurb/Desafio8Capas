import { Router } from "express";
import ProductManagerMongo from "../Daos/Controllers/ProductManagerMongo.js"
const productos = new ProductManagerMongo("../Controllers/ProductManagerMongo.js");

const realTime = Router();

//vista realtime
realTime.get("/", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const prodsRaw = await productos.getProducts(limit);
  const prods = prodsRaw.map(item=>item.toObject())
  res.render("realTimeProducts", { productos: prods });
});

export default realTime;
