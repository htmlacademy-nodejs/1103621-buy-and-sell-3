'use strict';

const sequelize = require(`sequelize`);

class CategoryService {
  constructor(db) {
    this._db = db;
  }

  async findAll(oneOfferMin) {
    let categories;
    if (oneOfferMin) {
      const sql = `SELECT
      "Categories".id,
      "Categories".name AS "name",
      count("Offers_Categories"."offerId") as "numberOfOffers"
    FROM "Categories"
    INNER JOIN "Offers_Categories"
      ON "Categories".id = "Offers_Categories"."categoryId"
    GROUP BY
      "Categories".id, "Categories".name
    HAVING
      count("Offers_Categories"."offerId") >= 1`;

      const type = sequelize.QueryTypes.SELECT;
      categories = await this._db.sequelize.query(sql, {
        type,
      });
    } else {
      categories = this._db.models.Category.findAll();
    }

    return categories;
  }

  async findOne(categoryId, limit, offset) {
    const category = await this._db.models.Category.findByPk(categoryId, {
      include: [{
        association: `offers`,
        include: [`type`, `categories`],
      }],
    });

    return category;
  }

}

module.exports = CategoryService;
