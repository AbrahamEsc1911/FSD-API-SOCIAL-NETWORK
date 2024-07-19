import { Schema, model } from "mongoose";

const CommentsSchema = new Schema(
    {
        message: {
            type: String,
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Posts',
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Comments = model('Comments', CommentsSchema)

export default Comments