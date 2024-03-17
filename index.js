import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouteAdmineRoute from "./routes/admin/AuthRouteAdmin.js";
import AuthRouteUser from "./routes/client/AuthRouteUser.js"
import cookieParser from "cookie-parser"
const app = express();
dotenv.config();

// Middleware pour l'analyse des données JSON dans les requêtes
app.use(express.json());
app.use(cookieParser());
// Middleware pour gérer les problèmes de CORS (Cross-Origin Resource Sharing)
app.use(cors());
app.use("/admin", AuthRouteAdmineRoute);
app.use("/user", AuthRouteUser);
app.get("/", (req, res) => {
  res.send("Welcome to our E-commerce APIs");
});

const port =5000;
// Démarrer le serveur et afficher un message lorsque le serveur est prêt
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});