import { sequelize } from './sequelize';
import { User } from './user';
import { Comment } from './comment';
import { Project } from './project';
import { Post } from './post';

const db = {
  sequelize,
  User,
  Comment,
  Project,
  Post,
};

export default db;

User.associate(db);
Comment.associate(db);
Project.associate(db);
Post.associate(db);
