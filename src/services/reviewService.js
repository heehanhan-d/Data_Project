import bcrypt from "bcrypt";

import { reviewModel } from "../db";

class ReviewService {
  // 리뷰 작성
  // eslint-disable-next-line no-shadow
  constructor(reviewModel) {
    this.reviewModel = reviewModel;
  }

  // 리뷰 추가
  async addReview(reviewInfo) {
    // const { title, userId } = reviewInfo;

    // DB 저장
    const createdNewReview = await this.reviewModel.create(reviewInfo);
    return createdNewReview;
  }

  // 리뷰 조회
  async getReviews() {
    const reviews = await this.reviewModel.getAllReviews();
    return reviews;
  }

  // 리뷰 삭제
  async deleteReviewData(reviewId) {
    const { deletedCount } = await this.reviewModel.deleteById(reviewId);

    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${reviewId} 리뷰 삭제에 실패하였습니다`);
    }

    return { result: "success" };
  }

  // 리뷰 수정
  async updateReviewData(reviewId) {
    //  const { updatedCount } = await this.reviewModel.updateById(reviewId);

    const update = await this.reviewModel.updateById(reviewId);
    return update;

      // 수정에 실패한 경우, 에러 메시지 반환
      if (updatedCount === 0) {
        throw new Error(`${reviewId} 리뷰 수정에 실패하였습니다`);
      }

       return { result: "success" };
   }
  }

const reviewService = new ReviewService(reviewModel);


export { reviewService };
