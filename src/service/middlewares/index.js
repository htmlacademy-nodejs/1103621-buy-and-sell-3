'use strict';

const offerValidator = require(`./offer-validator`);
const offerExists = require(`./offer-exists`);
const commentValidator = require(`./comment-validator`);
const categoryExists = require(`./category-exists`);

module.exports = {
  offerValidator,
  offerExists,
  commentValidator,
  categoryExists,
};
