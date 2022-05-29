import mongoose from "mongoose";
import app from "./index.js";
import 'dotenv/config'


const DB_URL = `mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@cluster0.vwt4x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const PORT = process.env.PORT || 3000


async function startUp() {
    try {

        await mongoose.connect(DB_URL)
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        })

    } catch (e) {

        console.log(e)

    }
}

startUp()
