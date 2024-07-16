import { Schema, model } from "mongoose";

const PostsSchema = new Schema(
    {
       post_message: {
        type: String,
        required: true,
       },
       user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        requierd: true,
       },
       comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comments'
       },
       likes: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
       }
    },
    {
        timestamps: true,
    }
);

const Posts = model('Posts', PostsSchema)

export default Posts