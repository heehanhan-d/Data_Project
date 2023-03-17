// eslint-disable-next-line import/no-unresolved, node/no-missing-import
import is from "@sindresorhus/is";
import { validationResult } from "express-validator";
import { reviewService } from "../services";

class ReviewController {
  async addReview(req, res, next) {
    // review 추가할 때 유효성 검사 로직입니다.
    try {
      if (is.emptyObject(req.body)) {
        throw new Error("json으로 contetn-type 설정 필요");
      }

      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   const error = new Error("Validation fail, entered data is incorrect.");
      //   error.status(400);
      //   throw error;
      // }

      const { userId, guId, dongId, title, content, reviewId } = req.body;
      const newReview = await reviewService.addReview({
        userId,
        guId,
        dongId,
        reviewId,
        title,
        content,
        // satisfactionLevel,
      });

      res.status(201).json(newReview);
    } catch (err) {
      next(err);
    }
  }

  async getReviews(req, res, next) {
    try {
      // 전체 제품 목록을 얻음
      const reviews = await reviewService.getReviews();

      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  }

  async updateReview(req, res, next) {
    try {
      const { userId, guId, dongId, title, content, reviewId } = req.body;
      // reviewId = req.params.reviewId;
      const updateReview = await reviewService.updateReviewData({
        userId,
        guId,
        dongId,
        title,
        content
        // satisfactionLevel,
      });
    
      res.status(200).json(updateReview);
    } catch (error) {
      next(error);
    }
  }

  async deleteReview(req, res, next) {
    try {
      const { reviewId } = req.params;
      // reviewId = req.params.reviewId
      const deleteResult = await reviewService.deleteReviewData(reviewId);

      res.status(200).json(deleteResult);
    } catch (error) {
      next(error);
    }
  }
}

const reviewController = new ReviewController(reviewService);

export { reviewController };
