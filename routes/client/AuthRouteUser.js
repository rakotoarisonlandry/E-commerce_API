import express from "express";
import  {AuthControllerClient}  from "../../controllers/client/index.js";
// import  {AuthControllerAdmin}  from "../../controllers/admin/auth/AuthControllerAdmin.js";

const router = express.Router();
router.post("/register",AuthControllerClient.register)
router.post("/login",AuthControllerClient.login)
router.post("/logout",AuthControllerClient.logout)

export default router;