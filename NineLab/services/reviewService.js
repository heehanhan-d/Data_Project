import bcrypt from "bcrypt";
import review from "../models/reviewModel";

class reviewService {
// 리뷰 작성
    static async create({
        guId,
        dongId,
        title,
        content,
        password,
        satisfactionLevel
        }) {
    const hashedPassword = await bcrypt.hash(password, saltround);

    const newReview = {
        guId,
        dongId,
        title,
        content,
        password: hashedPassword,
        satisfactionLevel
    };

    const createdReview = await review.create(newReview);

    if (!createdReview) {
        throw new Error("리뷰 등록에 실패했습니다.");
    }

    return createdReview;
} 

// 리뷰 수정
static async update(reviewId, toUpdate) {
    const review = await review.getById(reviewId);

    if (!review) {
        throw new Error("해당 리뷰는 존재하지 않습니다.");
    }

    const updateReview = await review.update(reviewId, toUpdate);

    return updateReview;
}

// 리뷰 삭제
static async delete(reviewId) {
    const deletedReview = await review.delete(reviewId);

    return deletedReview;
  }
}

export default reviewService;