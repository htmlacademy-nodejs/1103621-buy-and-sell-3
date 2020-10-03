'use strict';

class CategoryService {
  constructor(db) {
    this._db = db;
  }

  async findAll() {
    const categories = this._db.models.Category.findAll();

    return categories;
  }
}

module.exports = CategoryService;

