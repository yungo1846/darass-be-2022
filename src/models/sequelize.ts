const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.json")[env];
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
