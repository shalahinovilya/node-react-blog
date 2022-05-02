import mongoose from "mongoose";
import Post from "../models/Post.js";
import fileService from "./fileService.js";
import fs from 'fs-extra'

class PostService {

    async createPost (post, picture) {

        const fileName = fileService.saveFile(picture)
        const {title, description, id} = post

        const createdPost = await Post.create({
            'title': title,
            'description': description,
            'author': id,
            'img': fileName})

        return createdPost
    }

    async getPost(postId) {

        if (!postId) {
            throw new Error('Не указан id')
        }

        const post = await Post.findById(postId)
        return post

    }

    async getAllPosts() {

        const allPosts = Post.find()
        return allPosts

    }

    async deletePost(postId) {

        if (!postId) {
            throw new Error('Не указан id')
        }



        const deletedPost = await Post.findByIdAndRemove(postId)
        fs.remove(`/../js projects/nodeReactBlog/client/src/static/${deletedPost.img}`, (err) => {
            if (err) {
                console.log(err)
            }
            })
        return deletedPost

    }

    async updatePost(newPost) {

        if (!newPost.id) {
            throw new Error('Не указан id')
        }

        const updatedPost = await Post.findByIdAndUpdate(newPost.id, newPost, {new: true})
        return updatedPost

    }

}


export default new PostService();