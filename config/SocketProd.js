import ProductManagerMongo from "../Daos/Controllers/ProductManagerMongo.js";
import ChatManager from "../Daos/Controllers/ChatManager.js";
import http from "http";
import { Server } from "socket.io";

const productos = new ProductManagerMongo();
const chat= new ChatManager()


export default function configureWebSocketServer(app) {
  const server = http.createServer(app);
  const socketServerIO = new Server(server);
  socketServerIO.on("connection", (socket) => {
    console.log("Usuario conectado");

    socket.on("nuevoProducto", async (producto) => {
      await productos.addProduct(producto);

      socketServerIO.emit("actualizarTabla", await productos.getProducts());
    });
    socket.on("quitarProducto", async ({ id }) => {
      await productos.deleteById(id);
      console.log(id);

      socketServerIO.emit("actualizarTabla", await productos.getProducts());
    });
    socket.on("nuevoChat", async (mensaje) => {
      await chat.addMenssage(mensaje);
      console.log(mensaje);
  
      socketServerIO.emit("actualizarChat",chat.getChat());
    });
  });
 
  return { server, socketServerIO };
}
