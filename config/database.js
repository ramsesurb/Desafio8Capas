import mongoose from "mongoose";
import { config } from "./Config,.js";

const connectionStringUrl = config.mongo.url;

  try {
     mongoose.connect(connectionStringUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Base de datos conectada');}
  
  catch (error) {
    console.log('Error al conectar a la base de datos', error)
  }
