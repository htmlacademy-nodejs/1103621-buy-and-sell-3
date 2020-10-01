'use strict';

const Sequelize = require(`sequelize`);
const Operator = Sequelize.Op;

class OfferService {
  constructor(db) {
    this._db = db;
  }

  async create(offer) {
    const type = await this._db.models.Type.findAll({
      where: {
        name: offer.type
      }
    });

    const categories = await this._db.models.Category.findAll({
      where: {
        name: {
          [Operator.in]: offer.categories
        }
      }
    });

    const newOffer = await this._db.models.Ticket.create({
      title: offer.title,
      descr: offer.descr,
      picture: offer.picture,
      price: offer.price,
      type,
      categories,
    }, {
      include: [{
        association: this._db.models.Type,
        as: `type`,
      }, {
        association: this._db.models.Category,
        as: `categories`,
      }]
    });

    return newOffer;
  }

  async drop(id) {
    const deletedOffer = await this._db.models.Ticket.findByPk(id);
    await await this._db.models.Ticket.destroy({
      where: {
        id,
      }
    });

    return deletedOffer;
  }

  async findAll(amount, order) {
    const offers = await this._db.models.Ticket.findAll({
      include: [`author`, `type`, `categories`, [this._db.sequelize.literal(`(
        SELECT COUNT(*)
        FROM comments AS comment
        WHERE
            comment.ticketId = ticket.id
    )`), `numberOfComments`
      ]],
      order: [
        [`createdAt`, `DESC`]
      ],
      raw: true,
    });

    return this._offers;
  }

  static findOne(id) {
    return this._offers.find((item) => item.id === id);
  }

  static update(id, offer) {
    const oldOffer = this._offers.find((item) => item.id === id);

    return Object.assign(oldOffer, offer);
  }
}

module.exports = OfferService;
