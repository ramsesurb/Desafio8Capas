import { Router } from "express";
import ProductManagerMongo from "../Daos/Controllers/ProductManagerMongo.js";
import productoModel from "../Daos/Models/mongo.js";

const productos = new ProductManagerMongo("../Controllers/ProductManagerMongo.js");
const staticProd = Router();

const publicAcces = (req,res,next) =>{
  if(req.session.user) return res.redirect('/');
  next();
}

const privateAcces = (req,res,next)=>{
  if(!req.session.user) return res.redirect('/prods');
  next();
}

staticProd.get('/register', (req,res)=>{
  res.render('register') 
  
})

staticProd.get('/', publicAcces, (req,res)=>{
  res.render('login')
})

staticProd.get('/usuario', (req,res)=>{
  res.render('profile')
})

staticProd.get("/prods",  privateAcces, async (req, res) => {
  const { page = 1, limit: queryLimit, sort, descripcion } = req.query;

  // Obtener los productos paginados de Mongoose
  const options = { limit: 6, page, lean: true };

  if (queryLimit) {
    options.limit = parseInt(queryLimit);
  }

  if (sort) {
    options.sort = sort;
  }

 
  const query = {};
  if (descripcion) {
    query.descripcion = descripcion;
  }

  const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productoModel.paginate(query, options);

  const prodsRaw = await productos.getProducts(queryLimit, sort);
  const prods = prodsRaw.map(item => item.toObject());

  res.render("home", {
    productos: docs,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    user: req.session.user
  });
});


export default staticProd;