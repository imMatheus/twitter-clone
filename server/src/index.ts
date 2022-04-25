import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

async function main() {
    app.use(express.json())

    app.get('/', async (_, res) => {
        res.status(200).send('ok')
    })

    app.get('/feed', async (_, res) => {
        const posts = await prisma.post.findMany({
            where: { published: true },
            include: { author: true },
        })
        console.log(posts)
        res.json(posts)
    })

    app.get(`/posts`, async (req, res) => {
        const post = await prisma.post.create({
            data: {
                title: 'My first post',
                content: 'Hello world',
                published: true,
            },
        })
        res.json(post)
    })

    app.get(`/post/:id`, async (req, res) => {
        const { id } = req.params
        const post = await prisma.post.findFirst({
            where: { id: Number(id) },
        })
        res.json(post)
    })

    app.post(`/user`, async (req, res) => {
        const result = await prisma.user.create({
            data: { ...req.body },
        })
        res.json(result)
    })

    app.post(`/post`, async (req, res) => {
        const { title, content, authorEmail } = req.body
        const result = await prisma.post.create({
            data: {
                title,
                content,
                published: false,
                author: { connect: { email: authorEmail } },
            },
        })
        res.json(result)
    })

    app.put('/post/publish/:id', async (req, res) => {
        const { id } = req.params
        const post = await prisma.post.update({
            where: { id: Number(id) },
            data: { published: true },
        })
        res.json(post)
    })

    app.delete(`/post/:id`, async (req, res) => {
        const { id } = req.params
        const post = await prisma.post.delete({
            where: { id: Number(id) },
        })
        res.json(post)
    })

    app.listen(3000, () =>
        console.log('REST API server ready at: http://localhost:3000')
    )
}

console.log('hej')

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())
