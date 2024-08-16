import bcrypt from 'bcrypt'
import Users from './users.model.js'
import jwt from 'jsonwebtoken'
import { isValidObjectId } from 'mongoose'

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'email and password are required'
                }
            )
        }

        if (password.length < 8 || password.length > 12) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'password has to be between 8 and 12 characters'
                }
            )
        }

        const passhashed = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS))

        const newUser = await Users.create(
            {
                name: name,
                email: email,
                password: passhashed,
            }
        )

        res.json(
            {
                success: true,
                message: 'New user',
                data: newUser.email
            }
        )

    } catch (error) {
        res.json(
            {
                success: false,
                message: 'Coulnt create a new user',
                error: error.message
            }
        )
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'email and password are requiered',
                }
            )
        }

        const user = await Users.findOne(
            {
                email: email
            }
        )

        if (!user) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Email or password invalid'
                }
            )
        }

        const passCompared = bcrypt.compareSync(password, user.password)

        if (!passCompared) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Email or password invalid'
                }
            )
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.roles,
                email: user.email
            },
            process.env.SECRET_KEY
        )

        res.json(
            {
                success: true,
                message: 'User logged',
                data: token
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error login user',
                error: error.message
            }
        )
    }
}

export const getAllUsers = async (req, res) => {
    try {

        const allUses = await Users.find().select('email name profile followers following createdAt')

        res.json(
            {
                success: true,
                message: 'showing all users',
                data: allUses
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: true,
                message: 'Error retriving all users',
                error: error.message
            }
        )
    }
}

export const userProfile = async (req, res) => {
    try {
        const id = req.tokenData.id

        const user = await Users.findOne({ _id: id })
            .select('_id profile name email is_active createdAt followers posts following phone city born')
            .populate("posts", "post_message createdAt updatedAt likes comments")

        res.json(
            {
                success: true,
                message: 'User profile',
                data: user
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error retriving User profile',
                error: error.message
            }
        )
    }

}

export const getUserByEmail = async (req, res) => {
    try {
        const email = req.query.email

        const user = await Users.findOne({ email: email }).select('_id name email is_Active createdAt')

        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'User not found'
                }
            )
        }

        res.json(
            {
                success: true,
                message: 'User found',
                data: user
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error retriving user by email'
            }
        )
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.tokenData.id
        const { name, email, password, phone, city } = req.body
        let passhashed

        if ((password && password.length < 8) || (password && password.length > 12)) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'password has to be between 8 and 12 characters'
                }
            )
        }

        if (password) {
            passhashed = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS))
        }

        // const user = await Users.findOne(
        //     {
        //         _id: id
        //     },
        // )

        // if (user.name === name) {
        //     return res.status(400).json(
        //         {
        //             success: false,
        //             message: `name '${name}' already exist`
        //         }
        //     )
        // } else if (user.email === email) {
        //     return res.status(400).json(
        //         {
        //             success: false,
        //             message: `email '${email}' already exist`
        //         }
        //     )
        // } else if (user.phone === phone) {
        //     return res.status(400).json(
        //         {
        //             success: false,
        //             message: `phone '${phone}' already exist` 
        //         }
        //     )
        // }

        const userUpdated = await Users.updateOne(
            {
                _id: id
            },
            {
                name: name,
                email: email,
                password: passhashed,
                phone: phone,
                city: city
            }
        )

        res.json(
            {
                success: true,
                message: 'User data updated',
                data: userUpdated
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error updating user',
                error: error.message
            }
        )
    }
}

export const updateRole = async (req, res) => {
    try {
        const id = req.params.id
        const role = req.body.roles

        if (!isValidObjectId(id)) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'format of user Id is incorrect'
                }
            )
        }

        if (!role) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'role are requiered'
                }
            )
        }

        if (role !== 'user' && role !== 'admin') {
            return res.status(400).json(
                {
                    success: false,
                    message: 'that role doesnt exist'
                }
            )
        }

        const user = await Users.updateOne(
            {
                _id: id
            },
            {
                roles: role
            }
        )

        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'that user doesnt exist'
                }
            )
        }

        res.json(
            {
                success: true,
                message: `Role ${role} updated`,
                data: user
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: true,
                message: 'Error updating role',
                error: error.message
            }
        )
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id

        if (!isValidObjectId(id)) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'User Id is not valid'
                }
            )
        }

        const userDeleted = await Users.deleteOne(
            {
                _id: id
            }
        )

        if (userDeleted.deletedCount === 0) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'nothing to delete'
                }
            )
        }

        res.json(
            {
                success: true,
                message: 'User deleted',
                data: userDeleted
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error deleting user',
                error: error.message
            }
        )
    }
}

export const getPostByUserId = async (req, res) => {
    try {
        const userId = req.params.userid

        if (!isValidObjectId(userId)) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'User Id is not valid'
                }
            )
        }

        const userPosts = await Users.findById(userId)
            .select('email')
            .populate('posts', 'post_message createdAt')

        if (!userPosts) {
            return res.status(404).json(
                {
                    success: true,
                    message: 'User doesnt exists'
                }
            )
        }

        res.json(
            {
                success: true,
                message: 'User posts',
                data: userPosts
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error retriving post by user Id',
                error: error.message
            }
        )
    }
}

export const followUnfollow = async (req, res) => {
    try {
        const id = req.tokenData.id
        const userId = req.params.userId

        if (!isValidObjectId(userId)) {
            return res.status(400).json(
                {
                    succes: false,
                    message: 'User id is not valid'
                }
            )
        }

        const user = await Users.findById(userId)
            .select('_id name email followers')

        const miProfile = await Users.findById(id)

        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'user to follow not found'
                }
            )
        }

        if ((user._id).toString() === id) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'You cant follow yourself'
                }
            )
        }

        if (!user.followers.includes(id)) {
            user.followers.push(id)
            miProfile.following.push(userId)
            await user.save()
            await miProfile.save()

            return res.json(
                {
                    success: true,
                    message: 'You follow now this user',
                    data: user
                }
            )
        }

        await Users.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    followers: id
                }
            },
            {
                new: true,
            }
        )
        await Users.findByIdAndUpdate(
            id,
            {
                $pull: {
                    following: userId
                }
            },
            {
                new: true,
            }
        )

        res.json(
            {
                success: true,
                message: 'You just unfollowed this user',
                data: user
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error following user',
                error: error.message
            }
        )
    }
}

export const getUserById = async (req, res) => {
    try {

        const userId = req.params.id

        if (!isValidObjectId(userId)) {
            return res.status(400).json(
                {
                    succes: false,
                    message: 'User id is not valid'
                }
            )
        }

        const user = await Users.findById(userId)
            .select('name email following followers profile posts phone city born')
            .populate('posts', 'post_message comments likes user')

        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'User not found'
                }
            )
        }

        res.json(
            {
                success: true,
                message: 'User retrived',
                data: user
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'error retriving user by id',
                error: error.message
            }
        )
    }

}