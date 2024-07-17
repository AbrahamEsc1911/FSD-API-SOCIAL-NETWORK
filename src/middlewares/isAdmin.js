export const isAdmin = async (req, res, next) => {
    try {

        if (!req.tokenData.role === 'admin') {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Unauthorized'
                }
            )
        }

        next();

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error retrieving role',
                error: error.message
            }
        )
    }
}