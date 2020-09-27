'use strict';

const {
  HttpCode
} = require(`../../constants`);

module.exports = (db) => async (req, res, next) => {
  const {
    offerId
  } = req.params;
  const offer = await db.models.Ticket.findByPk(offerId, {
    include: [`author`, `type`, `categories`],
  });

  if (!offer) {
    res.status(HttpCode.NOT_FOUND)
      .send(`Offer with id ${offerId} is not found`);
    return;
  }

  res.locals.offer = offer;
  next();
};
