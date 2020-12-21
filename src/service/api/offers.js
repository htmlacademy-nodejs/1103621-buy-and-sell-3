'use strict';

const {
  Router
} = require(`express`);
const {
  HttpCode
} = require(`../../constants`);
const {
  offerValidator,
  offerExists,
  commentValidator
} = require(`../middlewares`);


const route = new Router();

module.exports = async (app, offerService, commentService) => {
  app.use(`/offers`, route);

  route.get(`/`, async (req, res) => {
    const offers = await offerService.findAll(req.query);

    res.status(HttpCode.OK).json(offers);
  });

  route.get(`/:offerId`, offerExists(offerService), (req, res) => {
    const {
      offer
    } = res.locals;

    return res.status(HttpCode.OK)
      .json(offer);
  });

  route.post(`/`, offerValidator, async (req, res) => {
    const offer = req.body;

    const newOffer = await offerService.create(offer);

    return res.status(HttpCode.CREATED)
      .json(newOffer);
  });


  route.put(`/:offerId`, [offerValidator, offerExists(offerService)], async (req, res) => {
    const {
      offerId
    } = req.params;

    const {
      offer
    } = req.body;

    const updatedOffer = await offerService.update(offerId, offer);


    return res.status(HttpCode.OK)
      .json(updatedOffer);
  });


  route.delete(`/:offerId`, async (req, res) => {
    const {
      offerId
    } = req.params;
    const deletedOffer = await offerService.drop(offerId);

    if (!deletedOffer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Offer with id ${offerId} is not found!`);
    }

    return res.status(HttpCode.OK)
      .json(deletedOffer);
  });

  route.get(`/:offerId/comments`, offerExists(offerService), async (req, res) => {
    const {
      offer
    } = res.locals;

    const comments = await commentService.findAll(offer);

    return res.status(HttpCode.OK)
      .json(comments);
  });


  route.delete(`/:offerId/comments/:commentId`, offerExists(offerService), async (req, res) => {
    const {
      offer
    } = res.locals;
    const {
      commentId
    } = req.params;

    const deletedComment = await commentService.drop(offer, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND)

        .send(`Comment with id ${commentId} is not found!`);
    }

    return res.status(HttpCode.OK)
      .json(deletedComment);
  });

  route.post(`/:offerId/comments`, [offerExists(offerExists), commentValidator], async (req, res) => {
    const {
      offer
    } = res.locals;

    const {
      comment
    } = req.body;

    const newComment = await commentService.create(offer, comment);

    return res.status(HttpCode.CREATED)
      .json(newComment);
  });

};
