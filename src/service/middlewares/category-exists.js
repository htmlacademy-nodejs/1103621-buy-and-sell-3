'use strict';

const {
  HttpCode
} = require(`../../constants`);

module.exports = (categoryService) => async (req, res, next) => {
  const {
    categoryId
  } = req.params;
  const category = await categoryService.findOne(categoryId);

  if (!category) {
    res.status(HttpCode.NOT_FOUND)
      .send(`The category with the id ${categoryId} is not found`);
    return;
  }

  next();
};
