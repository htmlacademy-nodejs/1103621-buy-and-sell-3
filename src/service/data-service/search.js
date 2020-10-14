'use strict';

const Sequelize = require(`sequelize`);

class SearchService {
  constructor(db) {
    this._db = db;
  }

  async findAll(searchText) {
    const Operator = Sequelize.Op;
    const searchResults = await this._db.models.Offer.findAll({
      where: {
        title: {
          [Operator.iLike]: `%${searchText}%`,
        }
      },
      include: [`type`],
    });

    return searchResults;
  }
}

module.exports = SearchService;
