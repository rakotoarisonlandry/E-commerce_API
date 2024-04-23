import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouteAdminRoute from "./routes/admin/AuthRouteAdmin.js";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import AuthRouteUser from "./routes/client/AuthRouteUser.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";
import { title } from "process";
import { version } from "os";
import { url } from "inspector";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Doc E-commerce API",
      version: "1.0.0",
      description: "E-commerce API",
    },
    server: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./utils/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(specs))
dotenv.config();

// Middleware pour l'analyse des données JSON dans les requêtes
app.use(express.json());
app.use(cookieParser());
// Middleware pour gérer les problèmes de CORS (Cross-Origin Resource Sharing)
app.use(cors());

const server = http.createServer(app); // Création du serveur HTTP

const io = new Server(server); // Initialisation de Socket.IO

io.on("connect", (socket) => {
  console.log("A client connected to WebSocket server");

  // Gére les événements WebSocket
  socket.on("disconnect", () => {
    console.log("A client disconnected from WebSocket server");
  });
});

app.use("/admin", AuthRouteAdminRoute);
app.use("/user", AuthRouteUser);

app.get("/", (req, res) => {
  res.send("Welcome to our E-commerce APIs");
});

const port = 5000;

// Démarre le serveur HTTP et affiche un message lorsque le serveur est prêt
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
