import { register, login, logout } from "./auth/AuthControllerAdmin.js";
import {
  addPro,
  deletePro,
  getProd,
  getProds,
  updatePro,
} from "./product/Product.js";
export const AuthControllerAdmin = Object.freeze({
  register,
  login,
  logout,
});

export const productController = Object.freeze({
  addPro,
  deletePro,
  updatePro,
  getProd,
  getProds,
});
