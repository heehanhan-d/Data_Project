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

/**
 * @swagger
 *  /api/review/add:
 *  post:
 *    tags: [Reviews]
 *    summary: 리뷰 등록 API
 *    produces:
 *    - application/json
 *    parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "리뷰 등록 내용 입력"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            userId:
 *              type: objectId
 *              description: "유저 아이디"
 *            guId:
 *              type: string
 *              description: "자치구 아이디"
 *            dongId:
 *              type: string
 *              description: "행정동 아이디"
 *            title:
 *              type: string
 *              description: "리뷰 제목"
 *            content:
 *              type: string
 *              description: "리뷰 내용"
 *            satisfactionLevel:
 *              type: number
 *              description: "만족도"
 *    responses:
 *      200:
 *        description: Review create success
 *      500:
 *        description: Server Error
 * 
 */


  async getReviews(req, res, next) {
    try {
      // 전체 리뷰 목록을 얻음
      const reviews = await reviewService.getReviews();

      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  }

/**
 * @swagger
 * /api/review/:
 *  get:
 *    tags: [Reviews]
 *    summary: 리뷰 전체 조회 API
 *    responses:
 *      200:
 *        description: Empty or Data
 *        schema:
 *          type: object
 *          properties:
 *            Reviews:
 *              type: object
 *              properties:
 *                userId:
 *                  type: objectId
 *                guId:
 *                  type: string
 *                dongId: 
 *                  type: string
 *                title:
 *                  type: string
 *                content:
 *                  type: string
 *                satisfactionLevel:
 *                  type: number
 *      500:
 *        description: Server Error
 */


  async updateReview(req, res, next) {
    try {
      const { userId, guId, dongId, title, content } = req.body;
      const reviewId = req.params.reviewId;
      const updateReview = await reviewService.updateReviewData({
        userId,
        guId,
        dongId,
        title,
        content,
        reviewId,
        // satisfactionLevel,
      });
    
      res.status(200).json(updateReview);
    } catch (error) {
      next(error);
    }
  }

/**
 * @swagger
 * /api/review/:reviewId:
 *  put:
 *    tags: [Reviews]
 *    summary: 특정 리뷰 수정 API
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "자치구, 행정동, 제목, 내용, 만족도 입력"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            userId:
 *              type: objectId
 *            guId:
 *              type: string
 *            dongId:
 *              type: string
 *            title:
 *              type: string
 *            content: 
 *              type: string
 *            satisfactionLevel:
 *              type: number
 *    response:
 *      200:
 *        description: Review change success
 *      404:
 *        description: NotFound
 *      500:
 *        description: Server Error
 * 
 */


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

/**
 * @swagger
 * /api/review/:reviewId:
 *  delete:
 *    tags: [Reviews]
 *    summary: 특정 리뷰 삭제 API
 *    produces:
 *    - application/json
 *    parameters:
 *      - in: body
 *        name: "reviewId"
 *        description: "reviewId 입력"
 *        required: true
 *    responses:
 *      200:
 *        description: Review delete (success or failed)
 *      404:
 *        description: NotFound
 *      500:
 *        description: Server Error
 * 
 */

const reviewController = new ReviewController(reviewService);

export { reviewController };

