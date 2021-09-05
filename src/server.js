const express = require("express");
const emoji = require("node-emoji");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const Contenedor = require("./contenedor");
const contenedorProductos = new Contenedor("./src/data/productos.json");
const contenedorMensajes = new Contenedor("./src/data/mensajes.json");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

io.on("connection", async (socket) => {

  const products = await contenedorProductos.getAll();

  socket.emit("productos", products);
  
  socket.on("registro", async (producto) => {
    await contenedorProductos.saveProduct(producto)

    io.sockets.emit("productos", products)
  });

  const messages = await contenedorMensajes.getAll();

  socket.emit("mensajes", messages);

  socket.on("mensajeNuevo", async (msg) =>{
    msg.fyh = new Date().toLocaleString();
    await contenedorMensajes.saveProduct(msg)
    io.sockets.emit("mensajes", messages)
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));



app.get("/", (req, res) => {
res.sendFile(__dirname + "/public/index.html")
});

const PORT = 8080;

httpServer.listen(PORT, console.log(`Server on port = ${PORT}`));
