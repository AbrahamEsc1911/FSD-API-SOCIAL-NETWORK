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