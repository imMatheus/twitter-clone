"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        app.use(express_1.default.json());
        app.get('/feed', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const posts = yield prisma.post.findMany({
                where: { published: true },
                include: { author: true },
            });
            res.json(posts);
        }));
        app.get(`/post/:id`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const post = yield prisma.post.findFirst({
                where: { id: Number(id) },
            });
            res.json(post);
        }));
        app.post(`/user`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.user.create({
                data: Object.assign({}, req.body),
            });
            res.json(result);
        }));
        app.post(`/post`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { title, content, authorEmail } = req.body;
            const result = yield prisma.post.create({
                data: {
                    title,
                    content,
                    published: false,
                    author: { connect: { email: authorEmail } },
                },
            });
            res.json(result);
        }));
        app.put('/post/publish/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const post = yield prisma.post.update({
                where: { id: Number(id) },
                data: { published: true },
            });
            res.json(post);
        }));
        app.delete(`/post/:id`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const post = yield prisma.post.delete({
                where: { id: Number(id) },
            });
            res.json(post);
        }));
        app.listen(3000, () => console.log('REST API server ready at: http://localhost:3000'));
    });
}
main()
    .catch((e) => console.error(e))
    .finally(() => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.$disconnect(); }));
//# sourceMappingURL=index.js.map