const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedpass) => {
        if (err) {
            res.json({
                error: err
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedpass
        })
        user.save()
            .then(user => {
                res.json({
                    message: 'User Added Successfully!'
                })
            })
            .catch(error => {
                res.json({
                    message: 'An Error Occured!'
                })
            })
    })
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({
        $or: [
            { email: username },
            { phone: username }
        ]
    })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
                        let refreshtoken = jwt.sign({ name: user.name }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME })
                        res.status(200).json({
                            message: 'Login Succesfully!',
                            token,
                            refreshtoken
                        })
                    } else {
                        res.status(200).json({
                            message: 'Password dose not matched!'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'No User Found!'
                })
            }
        })
}

const refreshToken = (req, res, next) => {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
        if (err) {
            res.status(400).json({
                err
            })
        }
        else {
            let token = jwt.sign({ name: decode.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
            let refreshToken = req.body.refreshToken
            res.status(200).json({
                message: 'Token Refresh succesfully!',
                token,
                refreshToken
            })
        }
    })
}

module.exports = {
    Register, login, refreshToken
}