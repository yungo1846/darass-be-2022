import { sequelize } from './sequelize';
import { User } from './user';
import { Comment } from './comment';

const db = {
  sequelize,
  User,
  Comment,
};

export default db;

User.associate(db);
Comment.associate(db);
