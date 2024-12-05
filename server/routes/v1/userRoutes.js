const { register, login } = require('../../controllers/userControllers')

const userRouter = require('express').Router()


userRouter.post("/signup", register)
userRouter.post("/login", login)

module.exports = userRouter