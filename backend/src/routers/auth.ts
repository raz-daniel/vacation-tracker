import { Router } from "express";
import validation from "../middlewares/validation";
import { loginValidator, registerValidator } from "../controllers/auth/validator";
import { login, register } from "../controllers/auth/controller";

const authRouter = Router()

authRouter.post('/register', validation(registerValidator), register)
authRouter.post('/login', validation(loginValidator), login)

export default authRouter