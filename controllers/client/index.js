import { register, login, logout } from "./auth/AuthControllerClient.js";
import { updateUser } from "./update/UpdateClient.js";
import { getUsers } from "./getUsers/GetUsers.js";
import { getUser } from "./getUsers/GetUser.js";
import { updatePassword } from "./update/UpdatePassword.js";
import {
  addComment,
  getAllComments,
  getOneComment,
} from "./comment/comment.js";
export const AuthControllerClient = Object.freeze({
  register,
  login,
  logout,
});
export const ControllerClient = Object.freeze({
  updateUser,
  getUsers,
  getUser,
  updatePassword,
});

export const ControllerCommentClient = Object.freeze({
  addComment,
  getAllComments,
  getOneComment,
});
