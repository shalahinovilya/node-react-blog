import Router from "express"
import postController from "../controllers/PostController.js";

import {checkToken} from "../../middleware/auth.middleware.js";

const postRouters = new Router()

postRouters.post('/posts/create-post', checkToken, postController.createPost)
postRouters.get('/posts/get-post/:id', checkToken, postController.getPost)
postRouters.get('/posts/get-all-posts', checkToken, postController.getAllPosts)
postRouters.delete('/posts/delete-post/:id',checkToken, postController.deletePost)
postRouters.put('/posts/update-post/:id', checkToken, postController.updatePost)

export default postRouters;