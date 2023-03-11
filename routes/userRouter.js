import express from "express";
import { postJoin } from "../services/userService";

const userRouter = express.Router();

userRouter.post("/join", postJoin);


export default userRouter;