'use strict';

const {HttpCode} = require(`../../constants`);

const offerKeys = [`category`, `description`, `picture`, `title`, `type`, `sum`];

module.exports = (req, res, next) => {
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const allKeysExist = offerKeys.every((key) => keys.includes(key));

  if (!allKeysExist) {
    res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
    return;
  }

  next();
};
