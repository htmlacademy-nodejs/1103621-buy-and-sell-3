'use strict';

const {HttpCode} = require(`../../constants`);

const offerKeys = [`categories`, `descr`, `picture`, `title`, `type`, `price`];

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
