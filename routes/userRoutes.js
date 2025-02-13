import { Router } from "express";
import { userRegister, userSearch } from "../controllers/userController.js";
import verifytoken from "../middlewares/jwtauth.js";
import userLogin from "../controllers/userController.js";

const userRoutes = Router()

userRoutes.post('/register',userRegister)
userRoutes.post('/login',userLogin)
userRoutes.get('/search',verifytoken,userSearch)

export default userRoutes