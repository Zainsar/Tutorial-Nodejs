const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err)
                res.json({
                    message: 'token invalid'
                })
            }
            else {
                console.log(user)
                req.user = user
                next()

            }
        })

    }
    catch (error) {
        if (error.name == "TokenExpireError") {
            res.status(401).json({
                message: "Token Expired!"
            })
        } else {
            res.json({
                message: 'Authentication failed!'
            })
        }
    }
}

module.exports = authenticate