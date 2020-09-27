'use strict';

const {
  Router
} = require(`express`);
const mainRouter = new Router();
const axios = require(`axios`);
const {
  shuffle
} = require(`../../utils`);
const PATH_TO_SERVICE = `http://localhost:3000`;

const getAllOffers = async () => {
  const serviceResp = await axios.get(`${PATH_TO_SERVICE}/api/offers`);
  return serviceResp.data;
};

const getEightRandomOffersForTheNewest = async () => {
  const allOffers = await getAllOffers();
  const shuffledOffers = shuffle(allOffers);

  return shuffledOffers.slice(0, 8);
};

const getFourMostDiscussedOffers = async () => {
  const allOffers = await getAllOffers();
  return allOffers.slice(0, 4);
};

const findOffersByQueryString = async (queryStr) => {
  try {
    const foundOffers = await axios.get(encodeURI(`${PATH_TO_SERVICE}/api/search?query=${queryStr}`));
    return foundOffers.data;
  } catch (error) {
    return [];
  }

};

mainRouter.get(`/`, async (req, res) => {
  const offersForTheNewest = await getEightRandomOffersForTheNewest();
  const offersForTheMostDiscussed = await getFourMostDiscussedOffers();
  res.render(`main`, {
    offersForTheNewest,
    offersForTheMostDiscussed
  });

});
mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/search`, async (req, res) => {
  const offers = await findOffersByQueryString(req.query.search);
  res.render(`search-result`, {
    offers
  });

});


module.exports = mainRouter;
