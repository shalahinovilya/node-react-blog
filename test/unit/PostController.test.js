import request from "supertest";
import app from "../../index.js"
import Post from "../../src/models/Post.js";
import path from "path";
import 'dotenv/config'
import {dbConnect, dbDisconnect} from '../config/database.js'
import {validateResponse} from '../utils/postValidators.utils.js'
import {remove} from "fs-extra";
import {postData} from "../config/default.js";


const agent = request.agent(app);
const staticPath = path.resolve('client', 'src', 'static')
postData.img = path.resolve('test', 'testStatic', 'test-img.jpg')


beforeAll(async () => {
    await dbConnect()

})

afterAll(async () => {
    await dbDisconnect()
})

describe('Post Controller', () => {

    test('App works', async () => {
        await agent
            .set({testOpt: 'secretTESTINGoption'})
            .get('/check')
            .expect(200)
            .then(async response => {
                expect(response.body).toEqual({message: 'check ok'})
            })
    })

    test('/app/posts/create-post', async () => {

        await agent
            .set({testOpt: 'secretTESTINGoption'})
            .post('/app/posts/create-post')
            .field("title", postData.title)
            .field("description", postData.description)
            .field("author", postData.author)
            .attach('img', postData.img)
            .expect(200)
            .then(async (response) => {

                expect(response.body._id).toBeTruthy()
                await validateResponse(response.body, postData)

                const post = await Post.findOne({_id: response.body._id})

                expect(post).toBeTruthy()
                expect(post.title).toBe(postData.title)
                expect(post.description).toBe(postData.description)
                expect(post.author.toString()).toBe(postData.author)
                expect(post.img).toBeTruthy()

                await remove(`${staticPath}\\${post.img}`)

            })

    })

    test('/app/posts/delete-post/:id', async () => {

        const createdPost = await agent
                .set({testOpt: process.env.testHeader})
                .post('/app/posts/create-post')
                .field("title", postData.title)
                .field("description", postData.description)
                .field("author", postData.author)
                .attach('img', postData.img)

        await agent
            .set({testOpt: process.env.testHeader})
            .delete(`/app/posts/delete-post/${createdPost.body._id}`)
            .expect(200)
            .then( async (response) => {

                expect(response.body._id).toBe(createdPost.body._id)
                await validateResponse(response.body, createdPost.body)

                expect(await Post.findOne({_id: response.body._id})).toBeFalsy()

            })

    })

    test(`/app/posts/update-post/:id`, async () => {


        const createdPost = await agent
            .set({testOpt: process.env.testHeader})
            .post('/app/posts/create-post')
            .field("title", postData.title)
            .field("description", postData.description)
            .field("author", postData.author)
            .attach('img', postData.img)

        const newPostData = {
            title: 'Test post title',
            description: 'Test post description',
            author: "6267d4901544eb38c60201c7",
            img: 'new-test-img.jpg'
        }

        const newFilePath = path.resolve('test', 'testStatic', newPostData.img)

        await agent
            .set({testOpt: process.env.testHeader})
            .put(`/app/posts/update-post/${createdPost.body._id}`)
            .field("title", newPostData.title)
            .field("description", newPostData.description)
            .field("author", newPostData.author)
            .attach('img', newFilePath)
            .expect(200)
            .then(async response => {

                expect(response.body._id).toBe(createdPost.body._id)
                await validateResponse(response.body, newPostData)

                const updatedPost = await Post.findOne({_id: response.body._id})

                expect(updatedPost).toBeTruthy()
                expect(updatedPost._id.toString()).toBe(response.body._id)
                expect(updatedPost.description).toBe(newPostData.description)
                expect(updatedPost.author.toString()).toBe(newPostData.author)
                expect(updatedPost.img).toBe(response.body.img)

                await remove(`${staticPath}\\${updatedPost.img}`)
            })

    })


    test('/app/posts/get-post/:id',async () => {

        const createdPost = await agent
            .set({testOpt: process.env.testHeader})
            .post('/app/posts/create-post')
            .field("title", postData.title)
            .field("description", postData.description)
            .field("author", postData.author)
            .attach('img', postData.img)

        await agent
            .set({testOpt: process.env.testHeader})
            .get(`/app/posts/get-post/${createdPost.body._id}`)
            .expect(200)
            .then(async response => {

                expect(response.body._id).toBe(createdPost.body._id)
                await validateResponse(response.body, createdPost.body)

                await remove(`${staticPath}\\${createdPost.body.img}`)
            })
    })

    test('/app/posts/get-all-posts', async () => {
        await agent
            .set({testOpt: 'secretTESTINGoption'})
            .get('/app/posts/get-all-posts')
            .expect(200)
            .then(async response => {

                expect(Array.isArray(response.body)).toBeTruthy()
                expect(response.body.length).toBeTruthy()

            })
    })
})