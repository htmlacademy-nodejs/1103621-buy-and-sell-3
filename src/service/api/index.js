'use strict';


const {
  Router
} = require(`express`);

const category = require(`./categories`);
const offer = require(`./offers`);
const search = require(`./search`);

const getMockData = require(`../lib/get-mock-data`);

const {
  CategoryService,
  OfferService,
  SearchService,
  CommentService,
} = require(`../data-service`);

const app = new Router();

const init = async () => {
  const mockData = await getMockData();

  category(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
  offer(app, new OfferService(mockData), new CommentService());

  return app;
};

module.exports = init;
