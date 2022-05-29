import Router from 'express'
import postController from "../controllers/PostController.js";

const postRouters = new Router()

postRouters.post('/posts/create-post', postController.createPost)
postRouters.get('/posts/get-post/:id', postController.getPost)
postRouters.get('/posts/get-all-posts', postController.getAllPosts)
postRouters.delete('/posts/delete-post/:id', postController.deletePost)
postRouters.put('/posts/update-post/:id', postController.updatePost)

export default postRouters;