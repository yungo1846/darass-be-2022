import { sequelize } from './sequelize';
import { User } from './user';
import { Comment } from './comment';
import { Project } from './project';

const db = {
  sequelize,
  User,
  Comment,
  Project,
};

export default db;

User.associate(db);
Comment.associate(db);
Project.associate(db);
