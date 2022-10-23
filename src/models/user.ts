import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  STRING,
  CreationOptional,
} from "sequelize";
import { sequelize } from "./sequelize";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare email: string;
  declare nickname: string;
  declare password: string;
  declare provider: CreationOptional<string>;
  declare snsId: CreationOptional<string>;
}

User.init(
  {
    email: {
      type: STRING(40),
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: STRING(20),
      allowNull: false,
    },
    password: {
      type: STRING(100),
      allowNull: false,
    },
    provider: {
      type: STRING(10),
      allowNull: false,
      defaultValue: "local",
    },
    snsId: {
      type: STRING(30),
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: "User",
    tableName: "users",
    paranoid: true,
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);
