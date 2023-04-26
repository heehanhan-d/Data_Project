import express from "express";
import { userController } from "../controllers";
import { myPage, changeUser } from "../services/myPage.js";

const userRouter = express.Router();

// 회원가입
userRouter.post("/users/register", userController.register);

// 로그인
userRouter.post("/users/login", userController.login);

// 마이페이지
userRouter.get("/users/myPage", myPage);

// 회원정보 수정
userRouter.post("/users/:userId", changeUser);

export default userRouter;
