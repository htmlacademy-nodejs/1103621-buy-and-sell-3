'use strict';

const {
  Router
} = require(`express`);
const {
  HttpCode
} = require(`../../constants`);

const {getLogger} = require(`../../logger/logger`);
const logger = getLogger();

const router = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, router);

  router.get(`/`, (req, res) => {
    const categories = service.findAll();

    res.status(HttpCode.OK)
      .json(categories);

    logger.info(`End request with status code ${res.statusCode}`);
  });
};
