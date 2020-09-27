'use strict';

const {
  Router
} = require(`express`);
const {
  HttpCode
} = require(`../../constants`);

const router = new Router();

module.exports = (app, db) => {
  app.use(`/categories`, router);

  router.get(`/`, async (req, res) => {

    const categories = await db.models.Category.findAll();
    const categoriesNames = [];
    categories.forEach((category) => {
      categoriesNames.push(category.name);
    });

    res.status(HttpCode.OK)
      .json(categories);
  });
};
