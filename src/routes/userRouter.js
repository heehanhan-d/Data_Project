import express from "express";
import { userController } from "../controllers";

const userRouter = express.Router();


// 회원가입
userRouter.post("/users/register", userController.register);

// 로그인
userRouter.post("/users/login", userController.login);

export default userRouter;

