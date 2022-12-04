import express from 'express';
import { loginRequired } from '../middlewares/auth';
import { Comment } from '../models/comment';
import { User } from '../models/user';

export const commentRouter = express.Router();

commentRouter.get('/', async (req, res) => {
  const comments = await Comment.findAll({
    include: [
      {
        model: User,
        as: 'commenter',
        attributes: ['id', 'email', 'name', 'provider', 'profileImage'],
      },
    ],
    attributes: ['id', 'content', 'createdAt', 'updatedAt'],
  });

  res.status(200).send(comments);
});

commentRouter.post('/', loginRequired, async (req, res) => {
  const { content } = req.body;

  const comment = await Comment.create({
    content,
    commenterId: req.user?.id ?? 1,
  });

  res.status(201).send(comment);
});
