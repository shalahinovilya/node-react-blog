import express from 'express';
import path from 'path'
import postRouters from "./src/routers/postRouter.js";
import userRouters from "./src/routers/userRouter.js";
import fileUpload from 'express-fileupload';


const app = express()
const staticPath = path.resolve('js projects', 'nodeReactBlog', 'client', 'src' )
app.use(express.json({
    extended: true,
}))
app.use(fileUpload({}))
app.use('/static', express.static(staticPath))
app.use('/app', userRouters)
app.use('/app', postRouters)

//HealthCheck
app.get('/check', (req, res) => {
    res.status(200).json({message: 'check ok'})
})

if(process.env.NODE_ENV === "production") {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


export default app
