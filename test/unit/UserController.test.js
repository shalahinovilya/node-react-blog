import request from "supertest";
import app from "../../index.js"
import User from "../../src/models/User.js";
import {dbConnect, dbDisconnect, dropCollections} from '../config/database.js'
import bcrypt from "bcrypt";
import {authData} from "../config/default.js";

const agent = request.agent(app);

beforeAll(async () => {
    await dbConnect()
})

afterEach(async () => {
    await dropCollections()
})

afterAll(async () => {
    await dbDisconnect()
})

describe('User Controller', () => {

    test('App works', async () => {
        await agent
            .get('/check')
            .expect(200)
            .then(async response => {
                expect(response.body).toEqual({message: 'check ok'})
            })
    })


    test('/app/users/auth/register', async () => {

        await agent
            .post('/app/users/auth/register')
            .send(authData)
            .expect(200)
            .then(async response => {

                expect(response.body.email).toBe(authData.email)
                expect(response.body.password).toBe(authData.password)
                expect(response.body.username).toBe(authData.username)

                const newUser = await User.findOne({email: authData.email})

                const checkPassword = await bcrypt.compare(authData.password, newUser.password)
                expect(newUser.email).toBe(authData.email)
                expect(checkPassword).toBeTruthy()
                expect(newUser.username).toBe(authData.username)
            })

    })

    test('/app/users/auth/login', async () => {

        const newUser = await agent
            .post('/app/users/auth/register')
            .send(authData)
            .expect(200)

        await agent
            .post('/app/users/auth/login')
            .send(newUser.body)
            .expect(200)
            .then(async response => {

                expect(response.body).toBeTruthy()
                expect(response.body.token).toBeTruthy()

            })

    })

    test('/app/users/show-user/:id', async () => {

        await agent
            .post('/app/users/auth/register')
            .send(authData)
            .expect(200)

        const newUser = await User.findOne({email: authData.email})

        await agent
            .get(`/app/users/show-user/${newUser._id}`)
            .expect(200)
            .then(async response => {

                expect(response.body.email).toBe(authData.email)
                expect(response.body.username).toBe(authData.username)
            })
    })

})