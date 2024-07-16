import bcrypt from 'bcrypt'
import Users from './users.model.js'

export const register = async (req, res) => {
    try {

        const { email, password } = req.body

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