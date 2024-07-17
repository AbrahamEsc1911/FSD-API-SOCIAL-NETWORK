import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
    try {
       
        if(!req.headers.authorization){
            res.status(401).json(
                {
                    success: false,
                    message: 'Unautorized'
                }
            )
        }

        const token = req.headers.authorization.split(' ')[1];
       
        const decode = jwt.verify(token, process.env.SECRET_KEY)

        req.tokenData = {
            id: decode.id,
            roles: decode.role,
            email: decode.email
        }
        
        next();
        
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Unauthorized'
            }
        )
    }
}