import { Schema } from "mongoose";

const ReviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  //  reviewId: {
  //    type: Schema.Types.ObjectId,
  //    ref: "reviews",
  //    required: true,
  //  },
  guId: {
    type: String,
    // required: true,
  },
  dongId: {
    type: String,
    // required: true,
  },
  title: {
    type: String,
    // trim: true,
    // required: true,
    default: "제목을 입력해주세요."
  },
  content: {
    type: String,
    default: "내용을 입력해주세요.",
  },
  // satisfactionLevel: {
  //   type: Number,
  //   default: true,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});


export default ReviewSchema;
