import bcrypt from 'bcrypt'
import Users from './users.model.js'
import jwt from 'jsonwebtoken'

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
                data: newUser
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
            process.env.SECRET_KEY,
            {
                expiresIn: '3h'
            }
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

        const allUses = await Users.find().select('email name roles createdAt')

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

        const user = await Users.findOne({ _id: id }).select('_id name email is_active createdAt')

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