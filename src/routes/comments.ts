import express from 'express';
import { Comment } from '../models/comment';
import { User } from '../models/user';

export const commentRouter = express.Router();

commentRouter.get('/', async (req, res) => {
  const comments = await Comment.findAll({
    include: [{ model: User, as: 'commenter', attributes: ['id', 'email', 'name', 'provider', 'profileImage'] }],
    attributes: ['id', 'content', 'createdAt', 'updatedAt'],
  });

  res.status(200).send(comments);
});
