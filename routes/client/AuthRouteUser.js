import express from "express";
import  {AuthControllerClient}  from "../../controllers/client/index.js";
// import  {AuthControllerAdmin}  from "../../controllers/admin/auth/AuthControllerAdmin.js";
import { ControllerClient } from "../../controllers/client/index.js";
import { ControllerCommentClient } from "../../controllers/client/index.js";
const router = express.Router();

// AUTH
router.post("/register",AuthControllerClient.register)
router.post("/login",AuthControllerClient.login)
router.post("/logout",AuthControllerClient.logout)
//CRUD user
router.put("/:IdUser", ControllerClient.updateUser)
router.get("/", ControllerClient.getUser)
//COMMENT
router.post("/comment", ControllerCommentClient.addComment)
export default router;