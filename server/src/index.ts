import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import { getAvatarUrl } from './utils/getAvatarUrl'

const PORT = 4000
const prisma = new PrismaClient()
const app = express()

app.use(cors())

async function main() {
    app.use(express.json())

    app.get('/', async (_, res) => {
        res.status(200).send('ok')
    })

    app.get('/feed', async (_, res) => {
        const posts = await prisma.tweet.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                owner: true,
            },
        })

        res.json(posts)
    })

    app.post(`/tweets`, async (req, res) => {
        console.log(req.body)
        const { ownerId } = req.body

        try {
            const result = await prisma.tweet.create({
                data: {
                    ...req.body,
                },
            })

            console.log('klarade det')

            await prisma.user.update({
                where: { id: ownerId },
                data: {
                    numberOfTweets: { increment: 1 },
                },
            })
            res.json(result)
        } catch (error) {
            res.json({ error: 'Could not create tweet' })
        }
    })

    app.get(`/tweets/:id`, async (req, res) => {
        const { id } = req.params
        const post = await prisma.tweet.findFirst({
            where: { id },
        })
        res.json(post)
    })

    app.put(`/tweets/:id/like`, async (req, res) => {
        const { id } = req.params
        console.log(id)
        const x = await prisma.tweet.update({
            where: { id },
            data: {
                numberOfLikes: { increment: 1 },
                likes: {
                    createMany: {
                        data: {
                            userId: '5a21fd5c-6695-4cf1-8d6c-50d143256c71',
                        },
                    },
                },
            },
        })
        console.log(x)

        res.send(id)

        // const post = await prisma.tweet.update({
        //     where: { id },
        //     data:{li}
        // })
        // res.json(post)
    })

    app.get('/users', async (_, res) => {
        try {
            const updatedUser = await prisma.user.update({
                where: { id: '5a21fd5c-6695-4cf1-8d6c-50d143256c71' },
                data: {
                    followersCount: { increment: 1 },
                    followers: {
                        createMany: {
                            data: {
                                followingId:
                                    '05e46dd5-440e-43b6-a99e-256d42f599e5',
                            },
                        },
                    },
                },
            })

            // followerId_followingId: {
            //     followerId: 'd7f7de60-3404-474f-a5d6-3cec7010ea34',
            //     followingId: '5a21fd5c-6695-4cf1-8d6c-50d143256c71',
            // },

            console.log(updatedUser)

            const users = await prisma.user.findMany({
                include: { followers: true },
            })
            res.json(users)
        } catch (error) {
            res.json({ error: 'Could not get users' })
        }
    })

    app.get('/users/:handle', async (req, res) => {
        const { handle } = req.params

        const user = await prisma.user.findFirst({
            where: { handle },
            include: {
                tweets: {
                    orderBy: { createdAt: 'desc' },
                    include: { owner: true },
                },
            },
        })

        if (!user) return res.json(null)

        // count number of tweets for user
        const numberOfTweets = await prisma.tweet.count({
            where: { owner: { id: user.id } },
        })

        return res.json({ ...user, numberOfTweets })
    })

    app.post('/users', async (req, res) => {
        try {
            const { password } = req.body
            const hash = bcrypt.hashSync(password, 10)
            const result = await prisma.user.create({
                data: {
                    ...req.body,
                    password: hash,
                    profileImage: getAvatarUrl(req.body.handle),
                },
            })
            res.json(result)
        } catch (error) {
            res.status(400).json({ error: 'Could not create user' })
        }
    })

    // login and set cookie for client
    app.post('/login', async (req, res) => {
        const { handle, password } = req.body
        const user = await prisma.user.findFirst({
            where: { handle },
        })
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' })
        }
        const isValid = bcrypt.compareSync(password, user.password)
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid password' })
        }
        res.cookie('userId', user.id, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        return res.json(user)
    })

    // app.delete(`/post/:id`, async (req, res) => {
    //     const { id } = req.params
    //     const post = await prisma.post.delete({
    //         where: { id: Number(id) },
    //     })
    //     res.json(post)
    // })

    console.log('start')

    app.listen(PORT, () =>
        console.log('REST API server ready at: http://localhost:' + PORT)
    )
}

console.log('hej')

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())
