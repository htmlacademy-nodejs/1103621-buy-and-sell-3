'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const {
  offerValidator,
  offerExists,
  commentValidator
} = require(`../middlewares`);

const route = new Router();

module.exports = (app, offerService, commentService) => {
  app.use(`/offers`, route);

  route.get(`/`, (req, res) => {
    const offers = offerService.findAll();
    res.status(HttpCode.OK).json(offers);
  });

  route.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Offer with id ${offerId} is not found!`);
    }

    return res.status(HttpCode.OK)
      .json(offer);
  });

  route.post(`/`, offerValidator, (req, res) => {
    const newOffer = offerService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(newOffer);
  });

  route.put(`/:offerId`, offerValidator, (req, res) => {
    const {offerId} = req.params;
    const existingOffer = offerService.findOne(offerId);

    if (!existingOffer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Offer with id ${offerId} is not found!`);
    }

    const updatedOffer = offerService.update(offerId, req.body);

    return res.status(HttpCode.OK)
      .json(updatedOffer);
  });

  route.delete(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const deletedOffer = offerService.drop(offerId);

    if (!deletedOffer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Offer with id ${offerId} is not found!`);
    }

    return res.status(HttpCode.OK)
      .json(deletedOffer);
  });

  route.get(`/:offerId/comments`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    const comments = commentService.findAll(offer);

    return res.status(HttpCode.OK)
      .json(comments);
  });

  route.delete(`/:offerId/comments/:commentId`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    const {commentId} = req.params;
    const deletedComment = commentService.drop(offer, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Comment with id ${commentId} is not found!`);
    }

    return res.status(HttpCode.OK)
      .json(deletedComment);
  });

  route.post(`/:offerId/comments`, [offerExists(offerService), commentValidator], (req, res) => {
    const {offer} = res.locals;
    const newComment = commentService.create(offer, req.body);

    return res.status(HttpCode.CREATED)
      .json(newComment);
  });

};
