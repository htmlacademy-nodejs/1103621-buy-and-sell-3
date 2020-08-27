'use strict';

const {
  Router
} = require(`express`);
const myRouter = new Router();
const axios = require(`axios`);
const PATH_TO_SERVICE = `http://localhost:3000`;

const getAllOffers = async () => {
  const serviceResp = await axios.get(`${PATH_TO_SERVICE}/api/offers`);
  return serviceResp.data;
};

const getOfferComments = async (id) => {
  const comments = await axios.get(`${PATH_TO_SERVICE}/api/offers/${id}/comments`);
  return comments;
};

const getFirstTwoOffersComments = async () => {
  const firstTwoOffers = await getAllOffers().slice(0, 2);

  const firstOfferID = firstTwoOffers[0];
  const secondOfferID = firstTwoOffers[1];

  const firstOfferComments = await getOfferComments(firstOfferID);
  const secondOfferComments = await getOfferComments(secondOfferID);

  return {
    firstOfferComments,
    secondOfferComments
  };
};

myRouter.get(`/`, async (req, res) => {
  const allOffers = await getAllOffers();
  res.render(`tickets/my-tickets`, {
    allOffers
  });
});
myRouter.get(`/comments`, async (req, res) => {
  const {firstOfferComments, secondOfferComments} = getFirstTwoOffersComments();
  res.render(`comments`, {
    firstOfferComments,
    secondOfferComments
  });
});

module.exports = myRouter;
