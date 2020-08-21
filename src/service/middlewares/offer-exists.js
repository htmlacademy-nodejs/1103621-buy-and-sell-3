'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
  const {offerId} = req.params;
  const offer = service.findOne(offerId);

  if (!offer) {
    res.status(HttpCode.NOT_FOUND)
      .send(`Offer with id ${offerId} is not found`);
    return;
  }

  res.locals.offer = offer;
  next();
};
