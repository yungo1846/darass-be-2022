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
import { Post } from './post';
import { sequelize } from './sequelize';
import { User } from './user';

export class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
  declare id: CreationOptional<number>;
  declare content: string;
  declare commenterId: ForeignKey<User['id']>;
  declare url: ForeignKey<Post['url']>;

  static associate(DB: typeof db) {
    DB.Comment.belongsTo(DB.User, { foreignKey: 'commenterId', as: 'commenter' });
    DB.Comment.belongsTo(DB.Post, { foreignKey: 'url', as: 'post' });
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
      allowNull: false,
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
