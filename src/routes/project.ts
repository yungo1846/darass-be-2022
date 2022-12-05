import express from 'express';
import { loginRequired } from '../middlewares/auth';
import { Project } from '../models/project';

export const ProjectRouter = express.Router();

ProjectRouter.get('/', loginRequired, async (req, res) => {
  const projects = await Project.findAll({
    where: [{ ownerId: req.user?.id }],
    attributes: ['id', 'content', 'createdAt', 'updatedAt'],
  });

  res.status(200).send(projects);
});

ProjectRouter.post('/', loginRequired, async (req, res) => {
  const { name, mode } = req.body;

  const project = await Project.create({
    name,
    mode,
    ownerId: req.user?.id ?? 1,
  });

  res.status(201).send(project);
});
