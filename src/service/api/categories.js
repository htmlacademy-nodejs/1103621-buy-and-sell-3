'use strict';

const {
  Router
} = require(`express`);
const {
  HttpCode
} = require(`../../constants`);
const {
  categoryExists
} = require(`../middlewares`);

const router = new Router();

module.exports = (app, categoryService) => {
  app.use(`/categories`, router);

  router.get(`/`, async (req, res) => {
    const {oneOfferMin} = req.query;

    const categories = await categoryService.findAll(oneOfferMin);

    res.status(HttpCode.OK)
      .json(categories);
  });

  router.get(`/:categoryId/`, categoryExists(categoryService), async (req, res) => {
    const {
      categoryId
    } = req.params;

    const {
      limit,
      offset
    } = req.query;

    const category = await categoryService.findOne(categoryId, limit, offset);

    return res.status(HttpCode.OK)
      .json(category);
  });
};
