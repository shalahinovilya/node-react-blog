import {config} from "dotenv";
import express from 'express';
import mongoose from "mongoose";
const path = require('path')
import postRouters from "./src/routers/postRouter.js";
import userRouters from "./src/routers/userRouter.js";
import fileUpload from 'express-fileupload';

config()

const DB_URL = `mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@cluster0.vwt4x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json({
    extended: true
}))
app.use(fileUpload({}))
app.use('/app', userRouters)
app.use('/app', postRouters)

if(process.env.NODE_ENV === "production") {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

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