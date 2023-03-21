import express from "express";
import { reviewController } from "../controllers/reviewController.js";
// import { loginRequired } from "../middleware/loginRequired.js";

const reviewRouter = express.Router();

// 리뷰 등록
reviewRouter.post("/reviews", reviewController.addReview);
// 리뷰 전체 조회
reviewRouter.get("/review", reviewController.getReviews);
// 리뷰 수정
reviewRouter.put(
  "/review/:reviewId",
  // loginRequired,
  reviewController.updateReview,
);

// 리뷰 삭제
reviewRouter.delete(
  "/review/:reviewId",
  // loginRequired,  로그인 필요 테스트 위해 주석 처리 !
  reviewController.deleteReview,
);

export default reviewRouter;
