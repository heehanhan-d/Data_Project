import express from "express";
import { reviewController } from "../controllers";
import { loginRequired } from "../middleware";


const reviewRouter = express.Router();

reviewRouter.post("/review/add", reviewController.addReview);

// /**
//  * @swagger
//  * paths:
//  *  /api/review/add:
//  *    post:
//  *      summary: "리뷰 등록"
//  *      description: "POST 방식으로 리뷰를 등록합니다."
//  *      tags: [Review]
//  *      responses:
//  */

reviewRouter.get("/review", reviewController.getReviews);
reviewRouter.put(
  "/review/:reviewId", 
  // loginRequired,  로그인 필요 테스트 위해 주석 처리 !
  reviewController.updateReview,
);
reviewRouter.delete(
  "/review/:reviewId",
  // loginRequired,  로그인 필요 테스트 위해 주석 처리 !
  reviewController.deleteReview,
);

export default reviewRouter;

