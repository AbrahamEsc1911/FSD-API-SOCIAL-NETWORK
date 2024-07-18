import { isValidObjectId } from "mongoose"
import Posts from "./posts.model.js"

export const createPost = async (req, res) => {
    try {

        const id = req.tokenData.id
        const message = req.body.message

        if (!message) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Message are required'
                }
            )
        }

        const newPost = await Posts.create(
            {
                post_message: message,
                user: id
            }
        )

        res.json(
            {
                success: true,
                message: 'New post',
                data: newPost
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error creating a new post'
            }
        )
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id

        if (!isValidObjectId(postId)) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Post Id is not valid'
                }
            )
        }

        const postDeleted = await Posts.deleteOne(
            {
                _id: postId
            }
        )

        if (postDeleted.deletedCount === 0) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'any post to delete with that id'
                }
            )
        }

        res.json(
            {
                success: true,
                message: 'Post deleted',
                data: postDeleted
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error deleting post',
                error: error.message
            }
        )
    }
}

export const updatePost = async (req, res) => {

}