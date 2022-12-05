import express from 'express';
import { loginRequired } from '../middlewares/auth';
import { Comment } from '../models/comment';
import { Post } from '../models/post';
import { Project } from '../models/project';
import { User } from '../models/user';

export const commentRouter = express.Router();

commentRouter.get('/', async (req, res) => {
  const url = req.query.url;
  const projectId = req.query.projectId;

  if (typeof url !== 'string') {
    return res.status(400).send('url query가 필요합니다.');
  }

  if (typeof projectId !== 'string') {
    return res.status(400).send('projectId query가 필요합니다.');
  }

  const project = await Project.findOne({ where: [{ id: projectId }] });

  if (project === null) {
    return res.status(404).send('존재하지 않는 프로젝트 입니다.');
  }

  const post = await Post.findOne({ where: [{ url }] });

  if (post == null) {
    await Post.create({ url, projectId });

    return res.status(200).send([]);
  }

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
  const { content, url } = req.body;

  const comment = await Comment.create({
    content,
    commenterId: req.user?.id ?? 1,
    url,
  });

  res.status(201).send(comment);
});
