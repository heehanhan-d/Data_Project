import express from "express";
import { reviewController } from "../controllers";
import { loginRequired } from "../middleware";


const reviewRouter = express.Router();

// 리뷰 등록
reviewRouter.post("/review/add", reviewController.addReview);

/**
 * @swagger
 * paths:
 *  /api/review/add:
 *    post:
 *      summary: "리뷰 등록"
 *      description: "POST 방식으로 리뷰를 등록합니다."
 *      tags: [Reviews]
 *      requestBody:
 *        description: 사용자가 서버로 전달하는 값에 따라 결과값은 다릅니다. (유저 등록)
 *        required: true
 *        content:
 *          application/x-www-form-ur lencoded:
 *            schema:
 *              type: string
 *              properties:
 *                userId:
 *                  type: object
 *                  description: "유저 아이디"
 *                guId:
 *                  type: string
 *                  description: "자치구 아이디"
 *                dongId:
 *                  type: string
 *                  description: "행정동 아이디"
 *                title:
 *                  type: string
 *                  description: "리뷰 제목"
 *                content:
 *                  type: string
 *                  description: "리뷰 내용"
 */

reviewRouter.get("/review", reviewController.getReviews);

/**
 * @swagger
 * /api/review/
 *  get:
 *    summary: "리뷰 데이터 전체 조회"
 *    description: "서버에 데이터를 보내지 않고 GET 방식으로 요청합니다."
 *    tags: [Reviews]
 *    responses:
 *      "200":
 *        description: 전체 리뷰 정보
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                reviews:
 *                  type: object
 *                  example:
 *                    [
 *                      { "_id": objectId, "userId": objectId, "guId": "강남구", "dongId": 서초동, "title": "살기 좋아요", "content": "이사 오세요" }
 *                      { "_id": objectId, "userId": objectId, "guId": "강남구", "dongId": 방배동, "title": "공기 좋아요", "content": "이사 오시죠" }
 *                      { "_id": objectId, "userId": objectId, "guId": "강남구", "dongId": 삼성동, "title": "인프라 좋아요", "content": "추천이요" }
 *                    ]
 */


reviewRouter.put(
  "/review/:reviewId", 
  // loginRequired,  로그인 필요 테스트 위해 주석 처리 !
  reviewController.updateReview,
);

/**
 * @swagger
 * /api/review/:reviewId
 *  put:
 *    summary: "리뷰 수정"
 *    description: "PUT 방식을 통해 특정 리뷰 수정(단일 데이터 수정시 사용)"
 *      tags: [Reviews]
 *      requestBody:
 *        description: "유저 수정"
 *        required: true
 *        content:
 *          application/x-www-form-ur lencoded:
 *            schema:
 *              type: object
 *              properties:
 *                guId:
 *                  type: string
 *                  description: "자치구 아이디"
 *                dongId:
 *                  type: string
 *                  description: "행정동 아이디"
 *                title:
 *                  type: string
 *                  description: "리뷰 제목"
 *                content:
 *                  type: string
 *                  description: "리뷰 내용"
 *        responses:
 *          "200":
 *            description: 사용자가 서버로 전달하는 값에 따라 결과값은 다릅니다. (유저 수정)
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    ok:
 *                      type: boolean
 *                    data:
 *                      type: object
 *                      example:
 *                        [
 *                          { "guId": "강남구", "dongId": 서초동, "title": "살기 좋아요", "content": "이사 오세요"}
 *                        ]                
 */


reviewRouter.delete(
  "/review/:reviewId",
  // loginRequired,  로그인 필요 테스트 위해 주석 처리 !
  reviewController.deleteReview,
);

/**
 * @swagger
 * /api/review/:reviewId
 *  delete:
 *    summary: "특정 리뷰 삭제"
 *    description: "요청 경로에 값을 담아 서버에 보냅니다."
 *    tags: [Reviews]
 *    parameters:
 *      - in: query
 *        name: reviewId
 *        required: true
 *        description: 리뷰 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과값은 다릅니다. (유저 삭제)
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  example:
 *                    [
 *                      { "success" }]
 */


export default reviewRouter;
