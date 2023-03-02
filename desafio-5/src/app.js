import express from "express";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js";
import { __dirname, __filename } from "./path.js";
import multer from "multer";
import { engine } from "express-handlebars";
import * as path from "path";
import { Server } from "socket.io";
import routerHome from "./routes/home.routes.js";
import routerRealTimeProducts from "./routes/realTimeProducts.routes.js";
import ProductManager from "./controllers/productManager.js";

const productManager = new ProductManager("src/models/products.json");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//ServerIo
const io = new Server(server);

//Routes
app.use("/", express.static(__dirname + "/public"));
app.use("/realtimeproducts", express.static(__dirname + "/public"));
app.use("/api/products", routerProduct);
app.use("/api/carts", routerCart);
app.use("/", routerHome);
app.use("/realtimeproducts", routerRealTimeProducts);
app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.send("Image uploaded");
});

io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  const products = await productManager.getProducts();
  socket.emit("messageGetProducts:", products);

  socket.on("messageNewProduct:", async (data) => {
    const newProduct = data;
    await productManager.addProduct(newProduct);
  });

  socket.on("messageDeleteProduct:", async (data) => {
    const idProduct = data;
    await productManager.deleteProductById(idProduct);
  });
});
