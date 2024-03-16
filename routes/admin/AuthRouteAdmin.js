import express from "express";
import  {AuthControllerAdmin}  from "../../controllers/admin/index.js";
// import  {AuthControllerAdmin}  from "../../controllers/admin/auth/AuthControllerAdmin.js";
import { productController } from "../../controllers/admin/index.js";
const router = express.Router();
router.post("/register",AuthControllerAdmin.register)
router.post("/login",AuthControllerAdmin.login)
router.post("/logout",AuthControllerAdmin.logout)
router.post("/product", productController.addPro);
router.get("/product", productController.getProds);
router.get("/product/:IdPro", productController.getProd);
router.put("/product/:IdPro", productController.updatePro);
router.delete("/product/:IdPro", productController.deletePro);
export default router;