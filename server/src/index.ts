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

    app.get('/users', async (_, res) => {
        const updatedUser = await prisma.user.findMany()
        // {
        // where: {
        //     id: '056be091-b1af-4c3f-ae64-29365e87d884',
        // }
        // data: {
        //     followers: {
        //         connect: {
        //             followerId_followingId:
        //                 '056be091-b1af-4c3f-ae64-29365e87d884',
        //         },
        //     },
        // },

        console.log(updatedUser)

        const users = await prisma.user.findMany({
            include: { followers: true },
        })
        res.json(users)
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

    // app.put('/post/publish/:id', async (req, res) => {
    //     const { id } = req.params
    //     const post = await prisma.post.update({
    //         where: { id: Number(id) },
    //         data: { published: true },
    //     })
    //     res.json(post)
    // })

    // app.delete(`/post/:id`, async (req, res) => {
    //     const { id } = req.params
    //     const post = await prisma.post.delete({
    //         where: { id: Number(id) },
    //     })
    //     res.json(post)
    // })

    app.listen(PORT, () =>
        console.log('REST API server ready at: http://localhost:' + PORT)
    )
}

console.log('hej')

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())
