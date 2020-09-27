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

module.exports = async (app, db) => {
  app.use(`/offers`, route);

  route.get(`/`, async (req, res) => {
    const offers = await db.models.Ticket.findAll({
      include: [`author`, `type`, `categories`],
      order: [
        [`createdAt`, `DESC`]
      ],
      raw: true,
    });
    res.status(HttpCode.OK).json(offers);
  });

  route.get(`/:offerId`, offerExists(db), (req, res) => {
    const {
      offer
    } = res.locals;

    return res.status(HttpCode.OK)
      .json(offer);
  });

  route.post(`/`, offerValidator, async (req, res) => {
    const newOffer = await db.models.Ticket.create({
      title: req.body.title,
      descr: req.body.descr,
      picture: req.body.picture,
      price: req.body.price,
      type: await db.models.Type.findAll({
        where: {
          name: req.body.type
        }
      }),
      categories: await Promise.all(req.body.categories.map(async (category) => (
        await db.models.Category.findAll({
          where: {
            name: category
          }
        })
      ))),
    }, {
      include: [{
        association: db.models.Type,
        as: `type`,
      }, {
        association: db.models.Category,
        as: `categories`,
      }]
    });

    return res.status(HttpCode.CREATED)
      .json(newOffer);
  });


  route.put(`/:offerId`, [offerValidator, offerExists(db)], async (req, res) => {
    const {
      offerId
    } = req.params;

    const updatedOffer = await db.models.Ticket.update({
      title: req.body.title,
      descr: req.body.descr,
      picture: req.body.picture,
      price: req.body.price,
      type: await db.models.Type.findAll({
        where: {
          name: req.body.type
        },
        raw: true
      }),
      categories: await Promise.all(req.body.categories.map(async (category) => (
        await db.models.Category.findAll({
          where: {
            name: category
          },
          raw: true
        })
      ))),
    }, {
      where: {
        id: offerId
      },
      include: [{
        association: db.models.Type,
        as: `type`,
      }, {
        association: db.models.Category,
        as: `categories`,
      }],
      returning: true
    })[1].dataValues[0];


    return res.status(HttpCode.OK)
      .json(updatedOffer);
  });


  route.delete(`/:offerId`, async (req, res) => {
    const {
      offerId
    } = req.params;
    const deletedOffer = await db.models.Ticket.findByPk(offerId);
    await await db.models.Ticket.destroy({
      where: {
        id: offerId,
      }
    });

    if (!deletedOffer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Offer with id ${offerId} is not found!`);
    }

    return res.status(HttpCode.OK)
      .json(deletedOffer);
  });

  route.get(`/:offerId/comments`, offerExists(db), async (req, res) => {
    const {
      offer
    } = res.locals;
    const comments = await offer.getComments({
      raw: true
    });

    return res.status(HttpCode.OK)
      .json(comments);
  });


  route.delete(`/:offerId/comments/:commentId`, offerExists(db), async (req, res) => {
    const {
      offer
    } = res.locals;
    const {
      commentId
    } = req.params;
    const deletedComment = await db.models.Comment.findByPk(commentId);
    await offer.removeComment(deletedComment);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND)

        .send(`Comment with id ${commentId} is not found!`);
    }

    return res.status(HttpCode.OK)
      .json(deletedComment);
  });

  route.post(`/:offerId/comments`, [offerExists(db), commentValidator], async (req, res) => {
    const {
      offer
    } = res.locals;

    const newComment = await db.models.Comment.create({
      content: req.body.text.create,
      ticketId: offer
    }, {
      include: {
        association: db.models.Ticket,
        as: `ticket`,
      }
    });

    return res.status(HttpCode.CREATED)
      .json(newComment);
  });

};
