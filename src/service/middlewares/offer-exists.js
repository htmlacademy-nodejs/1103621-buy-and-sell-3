'use strict';

const {
  HttpCode
} = require(`../../constants`);

module.exports = (offerService) => async (req, res, next) => {
  const {
    offerId
  } = req.params;
  const offer = await offerService.findOne(offerId);

  if (!offer) {
    res.status(HttpCode.NOT_FOUND)
      .send(`The ticket with the id ${offer} is not found`);
    return;
  }

  res.locals.offer = offer;
  next();
};
