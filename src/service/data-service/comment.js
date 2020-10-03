'use strict';

class CommentService {
  constructor(db) {
    this._db = db;
  }

  async create(offer, comment) {
    const newComment = await this._db.models.Comment.create({
      content: comment.text,
      offer,
    }, {
      include: {
        association: this._db.models.Offer,
        as: `offer`,
      }
    });

    return newComment;
  }

  async drop(offer, commentId) {
    const deletedComment = await this._db.models.Comment.findByPk(commentId);

    if (deletedComment) {
      await offer.removeComment(deletedComment);
    }

    return deletedComment;
  }

  async findAll(offer) {
    const comments = await offer.getComments();

    return comments;
  }
}

module.exports = CommentService;
