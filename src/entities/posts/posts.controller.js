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
        const id = req.tokenData.id
        const postId = req.params.id

        if (!isValidObjectId(postId)) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Post Id is not valid',
                }
            )
        }

        const user = await Users.findById(id)

        if (!user.posts.includes(postId)) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'This post is not yours or doesnt exists'
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

        await Users.findByIdAndUpdate(
            id,
            {
                $pull: {
                    posts: postId
                }
            },
            {
                new: true,
            }
        )

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

        const id = req.tokenData.id

        const userPosts = await Users.findById(id)
            .select('name email posts')
            .populate('posts', 'post_message')

        res.json(
            {
                success: true,
                message: 'All post retriving',
                data: userPosts
            }
        )

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

export const getAllPosts = async (req, res) => {
    try {
        const allPosts = await Posts.find()
            .select('post_message createdAt')
            .populate('user', 'email')

        if (!allPosts) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'Any post yet'
                }
            )
        }

        res.json(
            {
                success: true,
                message: 'All posts retrived',
                data: allPosts
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: true,
                message: 'Error retriving all posts',
                error: error.message
            }
        )
    }
}

export const getPostById = async (req, res) => {
    try {

        const postId = req.params.id

        if (!isValidObjectId(postId)) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Post id invalid'
                }
            )
        }

        const post = await Posts.findById(postId)
            .select('post_message createdAt likes')
            .populate('user', 'name profile email')
            .populate({ path: 'comments', select: 'message createdAt user', populate: { path: 'user', select: 'profile name' } })


        if (!post) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'Post not found'
                }
            )
        }

        res.json(
            {
                success: true,
                message: 'Post',
                data: post
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error retriving post',
                error: error.message
            }
        )
    }
}

export const likeDislike = async (req, res) => {
    try {
        const id = req.tokenData.id
        const postId = req.params.id

        if (!isValidObjectId(postId)) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Post id is invalid'
                }
            )
        }

        const post = await Posts.findById(postId)

        if (!post) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'post not found'
                }
            )
        }

        if (!post.likes.includes(id)) {
            post.likes.push(id)
            await post.save()

            return res.json(
                {
                    success: true,
                    message: 'you like this post',
                    data: post
                }
            )
        }

        await Posts.findByIdAndUpdate(
            postId,
            {
                $pull: {
                    likes: id
                },
            },
            {
                new: true
            }
        )

        res.json(
            {
                succes: true,
                message: 'you dislike this post',
                data: post
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error with like or Dislike',
                error: error.message
            }
        )
    }
}

export const timelineUsers = async (req, res) => {
    try {
        const id = req.tokenData.id

        const user = await Users.findById(id).select('following')
        
        if (!user) {
            return res.status(404).json(
                {
                    message: 'User not found'
                }
            );
        }

        const posts = await Posts.find(
            {
                user: {
                    $in: user.following
                }
            }
        ).populate('user', 'profile name')

        res.json(
            {
                succes: true,
                message: 'Timeline of your followers',
                data: posts
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error retriving users posts',
                error: error.message
            }
        )
    }
}