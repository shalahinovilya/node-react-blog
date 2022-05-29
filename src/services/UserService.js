import User from "../models/User.js";
import Post from "../models/Post.js";

class userService {

    async showUser(useId) {

        if (!useId) {
            throw new Error('Не указан id')
        }

        const {username, email} = await User.findById(useId)
        return {username, email}

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