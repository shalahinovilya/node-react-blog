import Post from "../models/Post.js";
import fileService from "./fileService.js";
import fs from 'fs-extra'

class PostService {

    async createPost (post, picture) {

        const fileName = fileService.saveFile(picture)
        const {title, author, description} = post

        const createdPost = await Post.create({
            'title': title,
            'description': description,
            'author': author,
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
        await fs.remove(`/../js projects/nodeReactBlog/client/src/static/${deletedPost.img}`, (err) => {
            if (err) {
                console.log(err)
            }
            })
        return deletedPost

    }

    async updatePost(newPostData, postId, picture) {

        if (!postId) {
            throw new Error('Не указан id')
        }

        const user = await Post.findOne({_id: postId})

        if (!user) {
            throw new Error('Нет поста с таким id')
        }

        await fs.remove(`/../js projects/nodeReactBlog/client/src/static/${user.img}`, (err) => {
            if (err) {
                console.log(err)
            }
        })

        const fileName = fileService.saveFile(picture)

        const newPost = {
            title: newPostData.title,
            description: newPostData.description,
            author: newPostData.author,
            img: fileName
        }
        const updatedPost = await Post.findByIdAndUpdate(postId, newPost, {new: true})

        return updatedPost

    }

}


export default new PostService();