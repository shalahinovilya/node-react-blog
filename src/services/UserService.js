import mongoose from "mongoose";
import User from "../models/User.js";
import Post from "../models/Post.js";
import {validationResult, body} from "express-validator";
import bcrypt, {hashSync} from "bcrypt";
import {has} from "mobx";

class userService {

    async createUser(user) {

        const createdUser = await User.create(user)
        return createdUser

    }

    async showUser(useId) {

        if (!useId) {
            throw new Error('Не указан id')
        }

        const findUser = await User.findById(useId)
        return findUser

    }

    async getUserPosts(userId) {

        if (!userId) {
            throw new Error('Не указан id')
        }
        const posts = await Post.find({'author': userId})
        return posts

    }

}

export default new userService();