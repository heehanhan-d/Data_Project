import { model } from "mongoose";

class Review {
    // 리뷰 작성
    static async create(newReview) {
        const review = new reviewModel(newReview);
        await review.save();

        return review;
    }

    // 리뷰 수정
    static async update(reviewId, toUpdate) {
        const updateReview = await reviewModel.findOneAndUpdate(
            { id: reviewId },
            toUpdate,
            { returnOfiginal: false }
        );

        return updateReview;
    }

    // 리뷰 삭제
    static async delete(reviewId) {
        const deletedReview = await reviewModel.findOneAndDelete(
            { id: reviewId }
        );

        return deletedReview;
    }
}

export default reviewModel;