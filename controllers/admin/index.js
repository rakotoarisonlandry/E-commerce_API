import { register, login, logout } from "./auth/AuthControllerAdmin.js";
import {
  addPro,
  deletePro,
  getProd,
  getProds,
  updatePro,
} from "./product/Product.js";
import { updateAdmin } from "./updateAdmin/UpdateAdmin.js";
import { getAdmin } from "./getAdmins/GetAdmin.js";
import { getAdmins } from "./getAdmins/GetAdmins.js";
export const AuthControllerAdmin = Object.freeze({
  register,
  login,
  logout,
});
export const Admin = Object.freeze({
  updateAdmin,
  getAdmin,
  getAdmins
})

export const productController = Object.freeze({
  addPro,
  deletePro,
  updatePro,
  getProd,
  getProds,
});   
