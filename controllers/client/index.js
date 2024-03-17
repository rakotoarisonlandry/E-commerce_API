import { register,login,logout } from "./auth/AuthControllerClient.js";
import { updateUser } from "./update/UpdateClient.js";
import { getUser } from "./getUsers/GetUsers.js";
import { addComment,getAllComments} from "./comment/comment.js";
export const AuthControllerClient = Object.freeze({
    register,
    login,
    logout
})
export const ControllerClient = Object.freeze({
    updateUser,
    getUser
})

export const ControllerCommentClient = Object.freeze({
    addComment,
    getAllComments
})