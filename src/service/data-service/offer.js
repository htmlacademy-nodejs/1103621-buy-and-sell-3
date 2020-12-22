'use strict';

const Sequelize = require(`sequelize`);
const Op = Sequelize.Op;

class OfferService {
  constructor(db) {
    this._db = db;
  }

  async create(offer) {
    let type = await this._db.models.Type.findOne({
      where: {
        name: offer.type
      }
    });


    const categories = await this._db.models.Category.findAll({
      where: {
        name: {
          [Op.in]: offer.categories
        }
      }
    });

    const newOffer = await this._db.models.Offer.create({
      title: offer.title,
      descr: offer.descr,
      picture: offer.picture,
      price: offer.price,
    });

    await newOffer.addCategories(categories);
    await newOffer.setType(type);

    return newOffer;
  }

  async drop(id) {
    const deletedOffer = await this._db.models.Offer.findByPk(id);
    await this._db.models.Offer.destroy({
      where: {
        id,
      }
    });

    return deletedOffer;
  }

  async findAll({limit, offset, order, justCount, isPagination, categoryId}) {
    if (justCount) {
      const count = await this._db.models.Offer.count({
        include: [{
          association: `categories`,
          where: {
            id: categoryId
          }
        }]
      });
      return count;
    }

    if (isPagination) {
      const category = await this._db.models.Category.findByPk(categoryId);
      const offers = await category.getOffers({
        limit,
        offset,
        include: [`author`, `type`, `categories`, `comments`],
      });
      // const offers = await this._db.models.Offer.findAll({
      //   limit,
      //   offset,
      //   include: [{
      //     association: `categories`,
      //     where: {
      //       id: categoryId
      //     }
      //   }]
      // });

      return offers;
    }

    let orderValue = [];
    switch (order) {
      case `newest`:
        orderValue.push([`createdAt`, `DESC`]);
        break;
      case `mostDiscussed`:
        orderValue.push([this._db.sequelize.literal(`"numberOfComments"`), `DESC`]);
        break;
    }
    const offers = await this._db.models.Offer.findAll({
      attributes: {
        include: [
          [this._db.sequelize.literal(`(
            SELECT COUNT(*)
            FROM "Comments" AS comment
            WHERE
                comment."offerId" = "Offer".id
        )`), `numberOfComments`
          ]
        ]
      },
      include: [`author`, `type`, `categories`, `comments`],
      order: orderValue,
      limit,
    });

    return offers;
  }

  async findOne(id) {
    const offer = await this._db.models.Offer.findByPk(id, {
      include: [`author`, `type`, `categories`, {
        association: `comments`,
        include: [`author`],
      }],
    });

    return offer;
  }

  async update(id, offer) {
    const type = await this._db.models.Type.findAll({
      where: {
        name: offer.type
      },
    });

    const categories = await this._db.models.Category.findAll({
      where: {
        name: {
          [Op.in]: offer.categories
        }
      }
    });

    const updatedOffer = await this._db.models.Offer.update({
      title: offer.title,
      descr: offer.descr,
      picture: offer.picture,
      price: offer.price,
      type,
      categories,
    }, {
      where: {
        id
      },
      include: [`type`, `categories`],
      returning: true
    });

    return updatedOffer[1];
  }
}

module.exports = OfferService;
