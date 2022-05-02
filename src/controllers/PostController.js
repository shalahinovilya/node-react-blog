import Post from "../models/Post.js";
import postService from "../services/PostService.js";

class postController {

    async createPost(req, res) {

        try {

            const post = await postService.createPost(req.body, req.files.img)
            res.json(post)

        } catch (e) {
            res.status(500).json(e.message)
        }


    }

    async getPost(req, res) {
        console.log(req.params)

        try {
            const post = await postService.getPost(req.params.id)
            res.json(post)
            console.log(post)

        } catch (e) {
            res.status(500).json(e.message)
        }

    }

    async getAllPosts(req, res) {

        try {
            const allPosts = await postService.getAllPosts()
            res.json(allPosts)

        } catch (e) {
            res.status(500).json(e.message)
        }


    }

    async deletePost(req, res) {

        try {
            const deletedPost = await postService.deletePost(req.params.id)
            res.json(deletedPost)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }

    async updatePost(req, res) {

        try {
            const updatedPost = await postService.updatePost(req.body)
            res.json(updatedPost)

        } catch (e) {
            res.status(500).json(e.message)
        }

    }

}

export default new postController();