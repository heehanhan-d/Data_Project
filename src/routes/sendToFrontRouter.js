import express from "express";
import { fineDust, ultraFineDust, flooding, housingSatisfaction } from "../services/sendToFrontService.js";

const sendToFrontRouter = express.Router();

// 미세먼지 json요청
sendToFrontRouter.get("/files/finedust", fineDust);

// 초 미세먼지 json요청
sendToFrontRouter.get("/files/ultrafinedust", ultraFineDust);

// 침수 json요청
sendToFrontRouter.get("/files/flooding", flooding);

// 주거만족 json요청
sendToFrontRouter.get("/files/housingSatisfaction", housingSatisfaction);

export default sendToFrontRouter;
