import User from "../models/User.js";
import userService from "../services/UserService.js";
import {validationResult, body} from "express-validator";

class userController {

    async createUser(req, res) {

        try {
            const user = await userService.createUser(req.body)
            res.json(req.body)
            return user

        } catch (e) {
            res.status(500).json(e.message)
        }

    }

    async showUser(req, res) {

        try {
            const user = await userService.showUser(req.params.id)
            res.json(req.body)
            return user

        } catch (e) {
            res.status(500).json(e.message)
        }

    }

    async getUserPosts(req, res) {

        try {
            const posts = await userService.getUserPosts(req.body['userId'])
            res.json(posts)
            return posts

        } catch (e) {
            res.status(500).json(e.message)
        }

    }

}

export default new userController();