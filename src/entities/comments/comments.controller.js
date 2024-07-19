import { isValidObjectId } from "mongoose"
import Posts from "../posts/posts.model.js"
import Comments from "./comments.model.js"
import Users from "../users/users.model.js"

export const createComment = async (req, res) => {
    try {
        const id = req.tokenData.id
        const postid = req.params.postId
        const comment = req.body.comment

        if (!isValidObjectId(postid)) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Post id is not valid'
                }
            )
        }

        if (!comment) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Comments are required'
                }
            )
        }

        const post = await Posts.findById(postid)

        if (!post) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'Post not found'
                }
            )
        }

        const newComment = await Comments.create(
            {
                message: comment,
                post: postid,
                user: id
            }
        )

        const user = await Users.findById(id)

        post.comments.push(newComment._id)
        await post.save()

        user.comments.push(newComment._id)
        await user.save()

        res.json(
            {
                success: true,
                message: 'New comment created',
                data: newComment
            }
        )

    } catch (error) {
        res.status(400).json(
            {
                success: false,
                message: 'Error creating a new comment',
                error: error.message
            }
        )
    }
}

export const updateComment = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}