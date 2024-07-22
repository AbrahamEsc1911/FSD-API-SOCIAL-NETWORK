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
        const id = req.tokenData.id
        const commentId = req.params.commentId
        const comment = req.body.comment

        if (!isValidObjectId(commentId)) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Comment Id is not valid'
                }
            )
        }

        if (!comment) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'New comment are requiered'
                }
            )
        }

        const user = await Users.findById(id)

        if (!user.comments.includes(commentId)) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Comments you are trying to edit is not yours or doesnt exist'
                }
            )
        }

        const commenUpdated = await Comments.findByIdAndUpdate(
            commentId,
            {
                message: comment
            }
        )

        res.json(
            {
                success: true,
                message: 'Comment updated successfully',
                data: commenUpdated
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error updating comments',
                error: error.message
            }
        )
    }
}

export const deleteComment = async (req, res) => {
    try {
        const id = req.tokenData.id
        const commentId = req.params.commentId

        if (!isValidObjectId(commentId)) {
            return res.status(400).json(
                {
                    succes: false,
                    message: 'Comment id is not valid'
                }
            )
        }
    
        const user = await Users.findById(id)

        if (!user.comments.includes(commentId)) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'This comment is not yours or doesnt exists'
                }
            )
        }

        const deletedComment = await Comments.findByIdAndDelete(commentId)

        await Users.findByIdAndUpdate(
            id,
            {
                $pull: {
                    comments: commentId
                }
            },
            {
                new: true,
            }
        )

        await Posts.findByIdAndUpdate(
            deletedComment.post,
            {
                $pull: {
                    comments: commentId
                }
            },
            {
                new: true,
            }
        )

        res.json(
            {
                success: true,
                message: 'Comment deleted successfully',
                data: deletedComment
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error deleting comments',
                error: error.message
            }
        )
    }
}

export const getAllUserComments = async (req, res) => {
    try {
        const id = req.tokenData.id

        const user = await Users.findById(id)
            .select('name email')
            .populate('comments', 'message createdAt')

        res.json(
            {
                success: true,
                message: 'All user comments',
                data: user
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                succcess: false,
                message: 'Error retriving all user comments',
                error: error.message
            }
        )
    }
}