import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  STRING,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from 'sequelize';
import db from '.';
import { sequelize } from './sequelize';
import { User } from './user';

export class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
  declare id: CreationOptional<number>;
  declare content: string;
  declare UserId: ForeignKey<User['id']>;

  static associate(DB: typeof db) {
    DB.Comment.belongsTo(DB.User, { as: 'commenter', foreignKey: 'UserId' });
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: STRING(1000),
      allowNull: true,
      unique: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'Comment',
    tableName: 'comments',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);
