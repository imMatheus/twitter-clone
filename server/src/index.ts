import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'
// import bcrypt from 'bcrypt'
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

    app.get(`/tweets`, async (_, res) => {
        const result = await prisma.tweet.findMany({})
        res.json(result)
    })

    app.post(`/tweets`, async (req, res) => {
        const result = await prisma.tweet.create({
            data: {
                ...req.body,
            },
        })
        res.json(result)
    })

    app.get(`/tweets/:id`, async (req, res) => {
        const { id } = req.params
        const post = await prisma.tweet.findFirst({
            where: { id },
        })
        res.json(post)
    })

    app.get('/users', async (_, res) => {
        const users = await prisma.user.findMany({})
        res.json(users)
    })

    app.post('/user', async (req, res) => {
        const result = await prisma.user.create({
            data: { ...req.body },
        })
        res.json(result)
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
        console.log('REST API server ready at: http://localhost:3000')
    )
}

console.log('hej')

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())
