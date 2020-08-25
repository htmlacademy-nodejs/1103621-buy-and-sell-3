'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const {
  offerValidator,
  offerExists,
  commentValidator
} = require(`../middlewares`);

const {getLogger} = require(`../../logger/logger`);
const logger = getLogger();

const router = new Router();

module.exports = (app, offerService, commentService) => {
  app.use(`/offers`, router);

  router.get(`/`, (req, res) => {
    const offers = offerService.findAll();
    res.status(HttpCode.OK).json(offers);

    logger.info(`End request with status code ${res.statusCode}`);
  });

  router.get(`/:offerId`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;

    res.status(HttpCode.OK)
      .json(offer);

    logger.info(`End request with status code ${res.statusCode}`);
  });

  router.post(`/`, offerValidator, (req, res) => {
    const newOffer = offerService.create(req.body);

    res.status(HttpCode.CREATED)
      .json(newOffer);

    logger.info(`End request with status code ${res.statusCode}`);
  });

  router.put(`/:offerId`, [offerValidator, offerExists(offerService)], (req, res) => {
    const {offerId} = req.params;

    const updatedOffer = offerService.update(offerId, req.body);

    res.status(HttpCode.OK)
      .json(updatedOffer);

    logger.info(`End request with status code ${res.statusCode}`);
  });

  router.delete(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const deletedOffer = offerService.drop(offerId);

    if (!deletedOffer) {
      res.status(HttpCode.NOT_FOUND)
        .send(`Offer with id ${offerId} is not found!`);

      logger.info(`End request with status code ${res.statusCode}`);

      return;
    }

    res.status(HttpCode.OK)
      .json(deletedOffer);

    logger.info(`End request with status code ${res.statusCode}`);
  });

  router.get(`/:offerId/comments`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    const comments = commentService.findAll(offer);

    res.status(HttpCode.OK)
      .json(comments);

    logger.info(`End request with status code ${res.statusCode}`);
  });

  router.delete(`/:offerId/comments/:commentId`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    const {commentId} = req.params;
    const deletedComment = commentService.drop(offer, commentId);

    if (!deletedComment) {
      res.status(HttpCode.NOT_FOUND)
        .send(`Comment with id ${commentId} is not found!`);

      logger.info(`End request with status code ${res.statusCode}`);

      return;
    }

    res.status(HttpCode.OK)
      .json(deletedComment);

    logger.info(`End request with status code ${res.statusCode}`);
  });

  router.post(`/:offerId/comments`, [offerExists(offerService), commentValidator], (req, res) => {
    const {offer} = res.locals;
    const newComment = commentService.create(offer, req.body);

    res.status(HttpCode.CREATED)
      .json(newComment);

    logger.info(`End request with status code ${res.statusCode}`);
  });

};
