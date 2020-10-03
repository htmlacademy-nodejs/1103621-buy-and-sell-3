'use strict';

const {
  Router
} = require(`express`);

const {
  CategoryService,
  OfferService,
  SearchService,
  CommentService
} = require(`../data-service`);

const category = require(`./categories`);
const offer = require(`./offers`);
const search = require(`./search`);

const app = new Router();

const init = async (db) => {
  category(app, new CategoryService(db));
  search(app, new SearchService(db));
  offer(app, new OfferService(db), new CommentService(db));

  return app;
};

module.exports = init;
