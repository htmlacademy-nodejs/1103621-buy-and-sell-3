'use strict';

const {
  Model,
  DataTypes
} = require(`sequelize`);

module.exports = (sequelize) => {
  class Comment extends Model {}

  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: false,
    hooks: {
      beforeValidate: (comment, options) => {
        if (!comment.authorId) {
          comment.authorId = 1;
        }
      }
    }
  });

  return Comment;
};
