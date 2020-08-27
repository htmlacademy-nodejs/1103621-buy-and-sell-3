'use strict';

const {
  Router
} = require(`express`);
const offersRouter = new Router();
const axios = require(`axios`);
const PATH_TO_SERVICE = `http://localhost:3000`;

const getOffer = async (id) => {
  const offer = await axios.get(`${PATH_TO_SERVICE}/offers/${id}`);
  return offer;
};

offersRouter.get(`/category/:id`, (req, res) => res.render(`category`));
offersRouter.get(`/add`, (req, res) => res.render(`tickets/new-ticket`));

offersRouter.get(`/edit/:id`, async (req, res) => {
  const offerForEditing = await getOffer(req.params.id);
  res.render(`tickets/ticket-edit`, {
    offerForEditing
  });
});

offersRouter.get(`/:id`, (req, res) => res.render(`tickets/ticket`));

module.exports = offersRouter;
