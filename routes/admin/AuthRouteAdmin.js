import express from "express";
import { AuthControllerAdmin } from "../../controllers/admin/index.js";
import { productController } from "../../controllers/admin/index.js";
import { Admin } from "../../controllers/admin/index.js";
const router = express.Router();
//Auth
router.post("/register", AuthControllerAdmin.register);
router.post("/login", AuthControllerAdmin.login);
router.post("/logout", AuthControllerAdmin.logout);
//produit
router.post("/product", productController.addPro);
router.get("/product", productController.getProds);
router.get("/product/:IdPro", productController.getProd);
router.put("/product/:IdPro", productController.updatePro);
router.delete("/product/:IdPro", productController.deletePro);
//CRUD
router.get("/", Admin.getAdmins);
router.get("/:IdAdmin", Admin.getAdmin);
router.put("/:IdAdmin", Admin.updateAdmin);
export default router;
