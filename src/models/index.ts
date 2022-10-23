import { sequelize } from "./sequelize";
import { User } from "./user";

const db = {
  sequelize,
  User,
};

export default db;
