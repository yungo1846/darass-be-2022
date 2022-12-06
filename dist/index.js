"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("./routes/user");
const models_1 = __importDefault(require("./models"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("./routes/auth");
const passports_1 = require("./passports");
const comments_1 = require("./routes/comments");
const cors_1 = __importDefault(require("cors"));
const project_1 = require("./routes/project");
const redis = __importStar(require("redis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
dotenv_1.default.config();
const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_PASSWORD,
    legacyMode: true,
});
const app = (0, express_1.default)();
const init = async () => {
    app.set('port', process.env.PORT || 8000);
    app.use(express_1.default.json());
    models_1.default.sequelize
        .sync({ force: false })
        .then(() => {
        console.log('db 연결 성공');
    })
        .catch((error) => {
        console.error(error);
    });
    app.use((0, morgan_1.default)('dev'));
    await redisClient.connect();
    app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
    app.use((0, express_session_1.default)({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET ?? 'secret',
        cookie: {
            httpOnly: true,
            secure: false,
        },
        store: new RedisStore({ client: redisClient }),
    }));
    (0, passports_1.passportConfig)();
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use((0, cors_1.default)({
        credentials: true,
        origin: ['http://localhost:3000', 'http://darass-2022-reply-module.s3-website.ap-northeast-2.amazonaws.com'],
    }));
    app.use('/v1/users', user_1.userRouter);
    app.use('/v1/auth', auth_1.authRouter);
    app.use('/v1/comments', comments_1.commentRouter);
    app.use('/v1/projects', project_1.ProjectRouter);
    app.use('/', (req, res) => {
        res.send('hello');
    });
    app.use((req, res, next) => {
        res.status(404);
        res.send('404 Not Found');
    });
    app.listen(app.get('port'), () => {
        console.log(app.get('port'), '번 포트에서 대기 중');
    });
};
init();
