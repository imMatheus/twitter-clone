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
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getAvatarUrl_1 = require("./utils/getAvatarUrl");
const PORT = 4000;
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        app.use(express_1.default.json());
        app.get('/', (_, res) => __awaiter(this, void 0, void 0, function* () {
            res.status(200).send('ok');
        }));
        app.get('/feed', (_, res) => __awaiter(this, void 0, void 0, function* () {
            const posts = yield prisma.tweet.findMany({
                orderBy: { createdAt: 'desc' },
                include: {
                    owner: true,
                },
            });
            res.json(posts);
        }));
        app.post(`/tweets`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.tweet.create({
                data: Object.assign({}, req.body),
            });
            res.json(result);
        }));
        app.get(`/tweets/:id`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const post = yield prisma.tweet.findFirst({
                where: { id },
            });
            res.json(post);
        }));
        app.get('/users', (_, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.user.findMany({});
            res.json(users);
        }));
        app.get('/users/:handle', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { handle } = req.params;
            const user = yield prisma.user.findFirst({ where: { handle } });
            res.json(user);
        }));
        app.post('/users', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { password } = req.body;
                const hash = bcrypt_1.default.hashSync(password, 10);
                const result = yield prisma.user.create({
                    data: Object.assign(Object.assign({}, req.body), { password: hash, profileImage: (0, getAvatarUrl_1.getAvatarUrl)(req.body.handle) }),
                });
                res.json(result);
            }
            catch (error) {
                res.status(400).json({ error: 'Could not create user' });
            }
        }));
        app.listen(PORT, () => console.log('REST API server ready at: http://localhost:3000'));
    });
}
console.log('hej');
main()
    .catch((e) => console.error(e))
    .finally(() => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.$disconnect(); }));
//# sourceMappingURL=index.js.map