import Router from 'express'
import userController from "../controllers/UserController.js";
import {validationResult,  check} from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userRouters = new Router()


userRouters.get('/users/:id/show-user', userController.showUser)
userRouters.get('/users/user-posts', userController.getUserPosts)
// userRouters.post('/users', userController.createUser)
userRouters.post('/users/auth/login', [
    check('email', 'Неккоректный email').isEmail(),
    check('password', 'Пароль должен быть не менее 6 символов').exists(),
    check('username', 'Username должен быть не менее 5 символов').exists()],
    async (req, res) => {

        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array,
                    message: 'Неккоректные данные при входе в систему'
                })
            }

            const {email, password, username} = req.body
            const user = await User.findOne({'email': email, 'username': username})

            if (!user) {
                return res.status(500).json('Такого пользователя не существует')
            }

            const checkPassword = await bcrypt.compare(password, user['password'])

            if (!checkPassword) {
                return res.status(400).json('Пароль введен неверно, попробуйте еще раз')
            }

            const token = jwt.sign(
                {userId: user._id},
                        process.env.jwtSecret,
                {expiresIn: '1h'})

            res.json({'token': token, 'userId': user._id})


        } catch (e) {
            return res.status(500).json({
                error: e,
                message:'Что-то пошло не так, попробуйте снова'
            })
        }

    })

userRouters.post('/users/auth/register', [
    check('email', 'Неккоректный email').isEmail(),
    check('password', 'Пароль должен быть не менее 6 символов').isLength({min: 6}),
    check('username', 'Username должен быть не менее 5 символов').isLength({min: 5})],

    async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array, message: 'Ошибка в запросе'})
            }

            const {email, password, username} = req.body
            const userEmail = await User.findOne({'email': email})

            if (userEmail) {
                return res.status(500).json('Пользователь с таким email уже существует')
            }
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = await User.create({'email': email, 'password': hashedPassword, 'username': username})

            return res.json({email, password, username})
        } catch (e) {
            return res.status(500).json({e: e, m:'Что-то пошло не так, попробуйте снова'})
        }

})

userRouters.post('/users/auth/logout', (req, res) => {

})

export default userRouters;