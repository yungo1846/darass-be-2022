import express from 'express';
import { loginRequired } from '../middlewares/auth';
import { Comment } from '../models/comment';
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

  const comments = await Comment.findAll({
    where: { url, projectId },
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
  const { content, url, projectId } = req.body;

  const project = await Project.findOne({ where: [{ id: projectId }] });

  if (project === null) {
    return res.status(404).send('존재하지 않는 프로젝트 입니다.');
  }

  const comment = await Comment.create({
    content,
    commenterId: req.user?.id ?? 1,
    url,
    projectId,
  });

  res.status(201).send(comment);
});
