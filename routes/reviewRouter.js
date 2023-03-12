import Router from "express";
import reviewService from "../services/reviewService";
import passwordMiddleware from "../middlewares/passwordMiddleware";

const reviewRouter = express.router();

// 리뷰 생성
Router.post("/", async(req, res, next) => {
    try {
        const { guId, dongId, title, content, password, satisfactionLevel } = req.body;

        const newReview = await reviewService.create({
            guId,
            dongId,  
            title, 
            content,
            password,
            satisfactionLevel
        });

        res.status(201).json(newReview);
    } catch (error) {
        next(error);
    }
});

// 리뷰 삭제
Router.delete("/:reviewId", passwordMiddleware, async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId;

        const deletedReview = await reviewService.delete(reviewId);;

        res.status(200).json(deleteReview);
    } catch (error) {
        next(error);
    }
});

export default reviewRouter;
