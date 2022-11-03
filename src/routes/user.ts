import express from 'express';
import { loginRequired } from '../middlewares/auth';

export const userRouter = express.Router();

userRouter.get('/profile', loginRequired, (req, res) => {
  res.status(200).send(req.user);
});

userRouter.get('/', (req, res, next) => {
  res.status(200);
  res.send(req.user);
});
