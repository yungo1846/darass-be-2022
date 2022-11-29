import { Model, InferAttributes, InferCreationAttributes, STRING, CreationOptional } from 'sequelize';
import db from '.';
import { sequelize } from './sequelize';

export class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
  declare content: string;

  static associate(DB: typeof db) {
    DB.Comment.belongsTo(DB.User, { as: 'commenter', foreignKey: 'id' });
  }
}

Comment.init(
  {
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
