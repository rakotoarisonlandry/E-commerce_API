import express from "express";
import  {AuthControllerClient}  from "../../controllers/client/index.js";
// import  {AuthControllerAdmin}  from "../../controllers/admin/auth/AuthControllerAdmin.js";
import { ControllerClient } from "../../controllers/client/index.js";
const router = express.Router();
router.post("/register",AuthControllerClient.register)
router.post("/login",AuthControllerClient.login)
router.post("/logout",AuthControllerClient.logout)
router.put("/:IdUser", ControllerClient.updateUser)
router.get("/", ControllerClient.getUser)
export default router;