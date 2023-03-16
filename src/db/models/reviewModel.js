import { model } from "mongoose";

import ReviewSchema from "../schemas/reviewSchema";

const Review = model("reviews", ReviewSchema);

export class ReviewModel {
  //  리뷰 추가
  async create(reviewInfo) {
    const createdNewReview = await Review.create(reviewInfo);
    return createdNewReview;
  }

  //  리뷰 삭제
  async deleteById(reviewId) {
    const deleteResult = await Review.deleteOne({ _id: reviewId });
    return deleteResult;
  }

  //  리뷰 조회
  async getAllReviews() {
    const reviews = await Review.find({});
    return reviews;
  }
}

const reviewModel = new ReviewModel();

export { reviewModel };
