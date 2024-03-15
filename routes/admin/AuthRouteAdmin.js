import express from "express";
import  {AuthControllerAdmin}  from "../../controllers/admin/index.js";
// import  {AuthControllerAdmin}  from "../../controllers/admin/auth/AuthControllerAdmin.js";

const router = express.Router();
router.post("/register",AuthControllerAdmin.register)
router.post("/login",AuthControllerAdmin.login)
router.post("/logout",AuthControllerAdmin.logout)

export default router;