import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import { userRouter } from './routes/user';
import db from './models';
import passport from 'passport';
import { authRouter } from './routes/auth';
import { passportConfig } from './passports';
import { commentRouter } from './routes/comments';
import cors from 'cors';
import { ProjectRouter } from './routes/project';
import * as redis from 'redis';
import _RedisStore from 'connect-redis';

dotenv.config();

const RedisStore = _RedisStore(session);
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
  legacyMode: true,
});
const app = express();

const init = async () => {
  app.set('port', process.env.PORT || 8000);
  app.use(express.json());

  db.sequelize
    .sync({ force: false })
    .then(() => {
      console.log('db 연결 성공');
    })
    .catch((error: unknown) => {
      console.error(error);
    });

  app.use(morgan('dev'));

  await redisClient.connect();

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET ?? 'secret',
      cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      },
      store: new RedisStore({ client: redisClient }),
    }),
  );

  passportConfig();
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(
    cors({
      credentials: true,
      origin: [
        'http://localhost:3000',
        'http://darass-2022-reply-module.s3-website.ap-northeast-2.amazonaws.com',
        'https://reply-module.darass.site',
      ],
    }),
  );
  app.use('/v1/users', userRouter);
  app.use('/v1/auth', authRouter);
  app.use('/v1/comments', commentRouter);
  app.use('/v1/projects', ProjectRouter);

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
