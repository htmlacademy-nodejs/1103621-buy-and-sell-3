'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => res.send(`/`));
mainRouter.get(`/register`, (req, res) => res.send(`/register`));
mainRouter.get(`/login`, (req, res) => res.send(`/login`));
mainRouter.get(`/my`, (req, res) => res.send(`/my`));
mainRouter.get(`/search`, (req, res) => res.send(`/search`));

module.exports = mainRouter;
