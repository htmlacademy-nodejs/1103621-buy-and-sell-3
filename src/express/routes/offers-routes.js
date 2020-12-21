'use strict';

const {
  Router
} = require(`express`);
const offersRouter = new Router();
const fs = require(`fs`).promises;
const formidable = require(`formidable`);
const moment = require(`moment`);

const axios = require(`axios`);
const PATH_TO_SERVICE = `http://localhost:3000`;
const PATH_TO_CATEGORIES = `./data/categories.txt`;

const getNumberOfOffers = async (categoryId) => {
  const count = await axios.get(`${PATH_TO_SERVICE}/api/offers?justCount=${true}&categoryId=${categoryId}`);

  return count.data;
};

const getOffers = async (categoryId, limit, offset) => {
  const offers = await axios.get(`${PATH_TO_SERVICE}/api/offers?isPagination=${true}&categoryId=${categoryId}&limit=${limit}&offset=${offset}`);

  return offers.data;
};

const getCategories = async (oneOfferMin) => {
  const categories = await axios.get(`${PATH_TO_SERVICE}/api/categories?oneOfferMin=${oneOfferMin}`);

  return categories.data;
};

const getCategory = async (id) => {
  const category = await axios.get(`${PATH_TO_SERVICE}/api/categories/${id}`);

  return category.data;
};

const getOffer = async (id) => {
  const response = await axios.get(`${PATH_TO_SERVICE}/api/offers/${id}`);
  return response.data;
};

const postOffer = async (offer) => {
  const response = await axios.post(`${PATH_TO_SERVICE}/api/offers`, offer);

  return response;
};

const formatDate = (date) => {
  return moment(date, moment.ISO_8601).format(`DD.MM.YYYY`);
};

const normalizeOffer = ((bodyOffer) => {
  const {
    fields,
    picture
  } = bodyOffer;

  const normilizedOffer = {
    title: fields[`ticket-name`],
    descr: fields.comment,
    type: fields.action === `sell` ? `продам` : `куплю`,
    categories: fields.category,
    price: fields.price,
    picture
  };

  return normilizedOffer;
});

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().replace(/\r/g, ``).split(`\n`);
  } catch (error) {
    return [];
  }
};

let allCategories;

const getPaginationNumbersObj = (page, numberOfPages) => {
  const paginationNumbersObj = {};
  let paginationNumbersArray = [];

  paginationNumbersObj.isValid = true;

  if (page > numberOfPages) {
    paginationNumbersObj.isValid = false;
    return paginationNumbersObj;
  }

  if (page > 3) {
    if (numberOfPages >= page + 2) {
      for (let i = 2; i >= -2; i--) {
        paginationNumbersArray.push(page - i);
      }
    } else {
      const diff = numberOfPages - page;
      switch (diff) {
        case 0:
          for (let i = 4; i >= 0; i--) {
            const num = page - i;
            if (num < 1) {
              continue;
            }
            paginationNumbersArray.push(num);
          }
          break;
        case 1:
          for (let i = 3; i >= 0; i--) {
            paginationNumbersArray.push(page - i);
          }
          paginationNumbersArray.push(page + 1);
      }
    }
  } else {
    for (let i = 1; i <= 5; i++) {
      if (i > numberOfPages) {
        break;
      }
      paginationNumbersArray.push(i);
    }
  }
  paginationNumbersObj.array = paginationNumbersArray;
  return paginationNumbersObj;
};

offersRouter.get(`/category/:id`, async (req, res) => {
  const {
    id
  } = req.params;

  let {
    page
  } = req.query;

  const DEFAULT_PAGE = 1;

  if (!page) {
    page = 1;
  } else {
    page = Number.parseInt(page, 10) || DEFAULT_PAGE;
  }

  const numberOfOffers = await getNumberOfOffers(id);
  const MAX_OFFERS_PER_PAGE = 8;
  const numberOfPages = Math.ceil(numberOfOffers / MAX_OFFERS_PER_PAGE);

  const offset = MAX_OFFERS_PER_PAGE * page - MAX_OFFERS_PER_PAGE;
  const offers = await getOffers(id, MAX_OFFERS_PER_PAGE, offset);

  const oneOfferMin = true;
  const topCategories = await getCategories(oneOfferMin);
  const category = await getCategory(id);

  const paginationNumbersObj = getPaginationNumbersObj(page, numberOfPages);
  if (!paginationNumbersObj.isValid) {
    res.redirect(`/offers/category/${category.id}`);
  }

  res.render(`category`, {
    topCategories,
    category,
    offers,
    numberOfPages,
    page,
    paginationNumbersArray: paginationNumbersObj.array,
    numberOfOffers
  });
});
offersRouter.get(`/add`, async (req, res) => {
  if (!allCategories) {
    allCategories = await readContent(PATH_TO_CATEGORIES);
  }

  res.render(`tickets/new-ticket`, {
    fields: {
      allCategories
    }
  });
});

offersRouter.get(`/edit/:id`, async (req, res) => {
  if (!allCategories) {
    allCategories = await readContent(PATH_TO_CATEGORIES);
  }

  const offerForEditing = await getOffer(req.params.id);

  console.log(offerForEditing);

  res.render(`tickets/ticket-edit`, {
    offerForEditing,
    fields: {
      allCategories
    }
  });
});

offersRouter.get(`/:id`, async (req, res) => {
  const offer = await getOffer(req.params.id);
  offer.createdAt = formatDate(offer.createdAt);
  res.render(`tickets/ticket`, {
    offer,
  });
});


offersRouter.post(`/add`, (req, res) => {
  const form = formidable({
    encoding: `utf-8`,
    uploadDir: `./tmp`,
    multiples: true,
  });

  form.parse(req, async (err, fields, files) => {
    console.log(fields);

    if (!allCategories) {
      allCategories = await readContent(PATH_TO_CATEGORIES);
    }

    const allFields = Object.assign(fields, {
      allCategories
    });

    const AVATARS_PATH = `src/express/public/img/`;
    const {
      type,
      size,
      path,
      name
    } = files.avatar;
    const allowTypes = [`image/jpeg`, `image/png`];

    if (size === 0 || !allowTypes.includes(type)) {
      fs.unlink(path);
      res.render(`tickets/new-ticket`, {
        fields: allFields
      });

      return;
    }

    try {
      await fs.rename(path, AVATARS_PATH + name);
    } catch (error) {
      throw new Error(`Oops! Error: ${error.message}`);
    }

    const response = await postOffer(normalizeOffer({
      fields: allFields,
      picture: name
    }));

    if (response.status === 201) {
      res.redirect(`/my`);
    } else {
      res.render(`tickets/new-ticket`, {
        fields: allFields,
        picture: name
      });
    }
  });
});

module.exports = offersRouter;
