import { isValidObjectId } from "mongoose"
import Posts from "./posts.model.js"
import Users from "../users/users.model.js"

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

        const user = await Users.findById(id)

        const newPost = await Posts.create(
            {
                post_message: message,
                user: id
            }
        )

        user.posts.push(newPost._id)
        await user.save()

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
                message: 'Error creating a new post',
                error: error.message
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
                    message: 'Post Id is not valid',
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
    try {
        const id = req.params.id
        const message = req.body.message

        if (!isValidObjectId(id)) {
            return res.status(400).json(
                {
                    succes: false,
                    message: 'Post id is not valid'
                }
            )
        }

        if (!message) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'New message are requiered'
                }
            )
        }

        const updatedPost = await Posts.updateOne(
            {
                _id: id
            },
            {
                post_message: message
            }
        )

        if (!updatedPost) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'Any post with that id found to update'
                }
            )
        }

        res.json(
            {
                success: true,
                message: 'Post updated',
                data: updatedPost
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error updating post',
                error: error.message
            }
        )
    }
}

export const getUserPosts = async (req, res) => {
    try {
        


    } catch (error) {
        res.status(500).json(
            {
                succes: false,
                message: 'Error retriving user posts',
                error: error.message
            }
        )
    }
}