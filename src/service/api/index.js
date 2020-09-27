'use strict';


const {
  Router
} = require(`express`);

const category = require(`./categories`);
const offer = require(`./offers`);
const search = require(`./search`);

const app = new Router();

const init = async (db) => {
  category(app, db);
  search(app, db);
  offer(app, db);

  return app;
};

module.exports = init;
