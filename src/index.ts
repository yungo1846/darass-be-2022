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

dotenv.config();
const app = express();

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
    },
  }),
);

passportConfig();
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }),
);
app.use('/v1/users', userRouter);
app.use('/v1/auth', authRouter);
app.use('/v1/comments', commentRouter);

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
