import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            requiered: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        is_active: {
            type: Boolean,
            default: true,
        },
        posts: {
            type: Schema.Types.ObjectId,
            ref: 'Posts'
        },
        followers: {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    },
    {
        timestamps: true,
    }
);

const Users = model('Users', UserSchema)

export default Users