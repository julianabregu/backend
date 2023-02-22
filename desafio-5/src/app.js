import express from "express";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js";
import { __dirname, __filename } from "./path.js";
import multer from "multer";
import { engine } from "express-handlebars";
import * as path from "path";
import { Server } from "socket.io";

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

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("mensaje", (info) => {
    console.log(info);
  });

  socket.emit("mensaje-general", "Hola, desde mensaje general");

  socket.broadcast.emit(
    "mensaje-socket-propio",
    "Hola, desde mensaje socket propio"
  );
});

//Routes
app.use("/", express.static(__dirname + "/public"));
app.use("/api/products", routerProduct);
app.use("/api/carts", routerCart);
app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.send("Image uploaded");
});
//HBS
app.get("/", (req, res) => {
  const user = {
    nombre: "Pablo",
    email: "p@p.com",
    rol: "tutor",
  };

  const cursos = [
    {
      numero: 123,
      dia: "Lunes y Miercoles",
      horario: "Noche",
    },
    {
      numero: 456,
      dia: "Martes y Jueves",
      horario: "Manana",
    },
    {
      numero: 789,
      dia: "Sabados",
      horario: "Tarde",
    },
  ];

  res.render("home", {
    titulo: "Ecommerce backend",
    mensaje: "Julian",
    usuario: user,
    isTutor: user.rol === "tutor",
    cursos,
  });
});
