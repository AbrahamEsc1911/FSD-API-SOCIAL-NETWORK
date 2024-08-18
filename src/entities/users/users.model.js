import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        profile: {
            type: String,
            require: true,
            default: 'https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg'
        },
        portada: {
            type: String,
            require: true,
            default: './images/portada.jpg'
        },
        name: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        born: {
            type: String,
            required: false,
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
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Posts'
            }
        ],
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            }
        ],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            }
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comments'
            }
        ]
    },
    {
        timestamps: true,
    }
);

const Users = model('Users', UserSchema)

export default Users