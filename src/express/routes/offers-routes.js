'use strict';

const {
  Router
} = require(`express`);
const offersRouter = new Router();
const fs = require(`fs`).promises;

const axios = require(`axios`);
const PATH_TO_SERVICE = `http://localhost:3000`;
const PATH_TO_CATEGORIES = `./data/categories.txt`;

const getOffer = async (id) => {
  const response = await axios.get(`${PATH_TO_SERVICE}/api/offers/${id}`);
  return response.data;
};

const postOffer = async (offer) => {
  const response = await axios.post(`${PATH_TO_SERVICE}/api/offers`, offer);

  return response;
};

const normalizeOffer = ((bodyOffer) => {
  const {
    fields,
    picture
  } = bodyOffer;
  return {
    title: fields[`ticket-name`],
    description: fields.comment,
    type: fields.action === `sell` ? `SALE` : `OFFER`,
    category: fields.category,
    sum: fields.price,
    picture
  };
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

offersRouter.get(`/category/:id`, (req, res) => res.render(`category`));
offersRouter.get(`/add`, async (req, res) => {
  if (!allCategories) {
    allCategories = await readContent(PATH_TO_CATEGORIES);
  }

  res.render(`tickets/new-ticket`, {
    fields: {allCategories}
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
    fields: {allCategories}
  });
});

offersRouter.get(`/:id`, (req, res) => res.render(`tickets/ticket`));
offersRouter.post(`/add`, async (req, res) => {
  console.log(req.fields);

  if (!allCategories) {
    allCategories = await readContent(PATH_TO_CATEGORIES);
  }

  const allFields = Object.assign(req.fields, {
    allCategories
  });

  const AVATARS_PATH = `src/express/public/upload/`;
  const {
    type,
    size,
    path,
    name
  } = req.files.avatar;
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

module.exports = offersRouter;
