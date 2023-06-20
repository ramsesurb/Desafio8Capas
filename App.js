import express from "express";
import handlebars from "express-handlebars";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import configureWebSocketServer from "./config/SocketProd.js";
import routerCart from "./Routes/Cart.js";
import routerProd from "./Routes/Productos.js";
import staticProd from "./Routes/StaticProd.js";
import __dirname from "./utils.js";
import realTime from "./Routes/realTime.js";
import "./config/database.js"
import realTimeChat from "./Routes/Chat.js";
import cartView from "./Routes/cartView.js";
import sessionRouter from "./Routes/sessions.js";
import initializePassport from './config/passport.js';
//import initializePassport from './config/passportCopy.js';
import passport from 'passport';
import { config } from "./config/Config,.js";



const MONGO = config.mongo.url;

//express
const app = express();
const PORT = config.server.port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//socketIo
const { server } = configureWebSocketServer(app);

//handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: "./views/layouts",
    partialsDir: "views",
  })
);
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
//mongo session
app.use(session({
  store: new MongoStore({
      mongoUrl: MONGO,
      ttl:3600
  }),
  secret:'CoderSecret',
  resave:false,
  saveUninitialized:false
}));
//passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/session', sessionRouter);
//websocket
app.use("/realTimeProducts", realTime);
app.use("/chat",realTimeChat)
//express estatico
app.use("/", staticProd);
app.use("/cart",cartView);
//rutas api
app.use("/api/cart", routerCart);
app.use("/api/productos", routerProd);

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
