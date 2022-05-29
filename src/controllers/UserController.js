import userService from "../services/UserService.js";


class userController {

    async showUser(req, res) {

        try {
            const user = await userService.showUser(req.params.id)
            res.json(user)

        } catch (e) {
            res.status(500).json(e.message)
        }

    }

    async getUserPosts(req, res) {

        try {
            const posts = await userService.getUserPosts(req.params.id)
            res.json(posts)

        } catch (e) {
            res.status(500).json(e.message)
        }

    }

}

export default new userController();