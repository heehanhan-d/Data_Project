import { mongoose, Schema } from "mongoose";

const reviewSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId, 
        required: true
    },
    guId: {
        type: String,
        required: true,
    },
    dongId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: '내용을 입력해주세요.'
    },
    password: {
        type: String,
        required: true
    },
    satisfactionLevel: {
        type: Number,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
});

export default reviewSchema;