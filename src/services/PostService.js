import Post from "../models/Post.js";
import fileService from "./fileService.js";
import fs from 'fs-extra'
import path from "path";

const staticPath = path.resolve() + '/client/src/static/'

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
        await fs.remove(`${staticPath}${deletedPost.img}`, (err) => {
            if (err) {
                console.log(err)
            }
            })
        return deletedPost

    }

    async updatePost(newPostData, postId, img) {

        let fileName

        if (!postId) {
            throw new Error('Не указан id')
        }

        const user = await Post.findOne({_id: postId})

        if (!user) {
            throw new Error('Нет поста с таким id')
        }

        if (typeof img === 'object') {

            fileName = fileService.saveFile(img)

            await fs.remove(`${staticPath}${user.img}`, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        }
        else if (typeof img === 'string') {
            const checkImg = await fs.pathExists(`${staticPath}${newPostData.img}`)
                .catch((e) => {
                    console.log(e)
                })

            if (!checkImg) throw new Error('Ошибка при загрузке изображение, попробуйте снова')
        }

        const newPost = {
            title: newPostData.title,
            description: newPostData.description,
            author: newPostData.author,
            img: fileName || img
        }
        const updatedPost = await Post.findByIdAndUpdate(postId, newPost, {new: true})

        return updatedPost

    }

}


export default new PostService();