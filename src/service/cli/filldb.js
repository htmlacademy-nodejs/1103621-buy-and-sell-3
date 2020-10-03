'use strict';

const fs = require(`fs`).promises;
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);
const chalk = require(`chalk`);
const {
  ExitCode
} = require(`../../constants`);

const FILE_NAME = `fill-db.js`;
const DEFAULT_COUNT = 1;
const FIXES_NUMBER_OF_USERS = 2; // better don't change

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const AvatarRestrict = {
  MIN: 1,
  MAX: 4,
};

const CommentsRestrict = {
  MIN: 2,
  MAX: 4,
};

const OfferType = {
  BUY: `куплю`,
  SALE: `продам`,
};

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;
const FILE_FIRSTNAMES_PATH = `./data/firstnames.txt`;
const FILE_LASTNAMES_PATH = `./data/lastnames.txt`;
const FILE_EMAILS_PATH = `./data/emails.txt`;
const FILE_PASSWORDS_PATH = `./data/passwords.txt`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().replace(/\r/g, ``).split(`\n`);
  } catch (error) {
    console.error(chalk.red(error));
    return [];
  }
};

const getAvatarFileName = (number) => `avatar${number.toString().padStart(2, 0)}.jpg`;

const getCodeForFillingUsers = (firstnames, lastnames, emails, passwords) => {
  let users = `const users = [\n`;

  for (let i = 0; i < FIXES_NUMBER_OF_USERS; i++) {
    users += `{
  firstname: '${shuffle(firstnames)[getRandomInt(0, firstnames.length - 1)]}',
  lastname: '${shuffle(lastnames)[getRandomInt(0, lastnames.length - 1)]}',
  email: '${shuffle(emails)[getRandomInt(0, emails.length - 1)]}',
  password: '${shuffle(passwords)[getRandomInt(0, passwords.length - 1)]}',
  avatar: '${getAvatarFileName(getRandomInt(AvatarRestrict.MIN, AvatarRestrict.MAX))}',
  },\n`;
  }

  return `${users}];\n\n`;
};

const getPictureFileName = (number) => `item${number.toString().padStart(2, 0)}.jpg`;

const generateOffer = (titles, sentences) => {
  return {
    id: `DEFAULT`,
    descr: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    typeId: getRandomInt(1, 2),
    price: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  };
};

const getCodeForFillingOffersTable = (
    numberOfFirstUserOffers,
    numberOfSecondUserOffers,
    titles, sentences) => {

  let codeForFillingOffersTable = `const offers = [\n`;

  for (let i = 0; i < numberOfFirstUserOffers; i++) {
    const offer = generateOffer(titles, sentences);
    codeForFillingOffersTable += `{
  title: '${offer.title}',
  descr: '${offer.descr}',
  picture: '${offer.picture}',
  price: ${offer.price},
  typeId: ${offer.typeId},
  authorId: 1,
},\n`;
  }

  for (let i = 0; i < numberOfSecondUserOffers; i++) {
    const offer = generateOffer(titles, sentences);
    codeForFillingOffersTable += `{
  title: '${offer.title}',
  descr: '${offer.descr}',
  picture: '${offer.picture}',
  price: ${offer.price},
  typeId: ${offer.typeId},
  authorId: 2,
},\n`;
  }

  return `${codeForFillingOffersTable}];\n\n`;
};

const getCodeForFillingTypesTable = () => {
  let codeForFillingTypesTable = `const types = [
{
  name: '${OfferType.BUY}',
},
{
  name: '${OfferType.SALE}',
}
];\n\n`;

  return codeForFillingTypesTable;
};

const getCodeForFillingCategoriesTable = (categories) => {
  let codeForFillingCategoriesTable = `const categories = [\n`;

  categories.forEach((category) => {
    codeForFillingCategoriesTable += `{
  name: '${category}',
},\n`;
  });

  return `${codeForFillingCategoriesTable}];\n\n`;
};

let categoriesIdArray;
const getCategoriesForOffer = (numberOfCategories) => {
  if (!categoriesIdArray) {
    categoriesIdArray = [];
    for (let i = 1; i <= numberOfCategories; i++) {
      categoriesIdArray.push(i);
    }
  }

  return shuffle(categoriesIdArray).slice(0, getRandomInt(1, 4));
};

const getCodeForFillingOffersCategoriesTable = (numberOfOffers, numberOfCategories) => {
  let offersCategoriesMap = new Map();

  for (let i = 1; i <= numberOfOffers; i++) {
    offersCategoriesMap.set(i, getCategoriesForOffer(numberOfCategories));
  }

  let codeForFillingOffersCategoriesTable = `const offersCategories = [\n`;
  offersCategoriesMap.forEach((value, key) => {
    value.forEach((categoryId) => {
      codeForFillingOffersCategoriesTable += `{
  offerId: ${key},
  categoryId: ${categoryId},
},\n`;
    });
  });

  return `${codeForFillingOffersCategoriesTable}];\n\n`;
};

const getCommentsForOffer = (comments) => {
  const numberOfComments = getRandomInt(CommentsRestrict.MIN, CommentsRestrict.MAX);

  let commentsObjectsArray = new Array(numberOfComments).fill({}).map(() => ({
    content: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
    authorId: getRandomInt(1, FIXES_NUMBER_OF_USERS),
  }));

  return commentsObjectsArray;
};

const getCodeForFillingCommentsTable = (comments, numberOfOffers) => {
  let offersIdCommentsMap = new Map();

  for (let i = 1; i < numberOfOffers; i++) {
    offersIdCommentsMap.set(i, getCommentsForOffer(comments));
  }

  let codeForFillingCommentsTable = `const comments = [\n`;
  offersIdCommentsMap.forEach((value, key) => {
    value.forEach((comment) => {
      codeForFillingCommentsTable += `{
  content: '${comment.content}',
  authorId: ${comment.authorId},
  offerId: ${key},
},\n`;
    });
  });

  return `${codeForFillingCommentsTable}];\n\n`;
};

const generateFillingCode = (parameters) => {
  let {count, firstnames, lastnames,
    emails, passwords,
    sentences, titles, categories, comments} = parameters;

  let content = `'use strict';\n\n`;
  content += getCodeForFillingUsers(firstnames, lastnames, emails, passwords);

  content += getCodeForFillingTypesTable();

  const numberOfFirstUserOffers = Math.floor(count / 2);
  const numberOfSecondUserOffers = count - numberOfFirstUserOffers;

  content += getCodeForFillingOffersTable(numberOfFirstUserOffers, numberOfSecondUserOffers,
      titles, sentences);

  content += getCodeForFillingCategoriesTable(categories);

  content += getCodeForFillingOffersCategoriesTable(count, categories.length);

  content += getCodeForFillingCommentsTable(comments, count);

  content += `module.exports = {
  users,
  types,
  offers,
  categories,
  offersCategories,
  comments,
};`;

  return content;
};

module.exports = {
  name: `--filldb`,
  async run(args) {
    const [count] = args;
    let countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer < 1) {
      countOffer = DEFAULT_COUNT;
    } else if (countOffer > 1000) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.error);
    }

    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);

    const firstnames = await readContent(FILE_FIRSTNAMES_PATH);
    const lastnames = await readContent(FILE_LASTNAMES_PATH);
    const emails = await readContent(FILE_EMAILS_PATH);
    const passwords = await readContent(FILE_PASSWORDS_PATH);

    const parameters = {
      sentences,
      titles,
      categories,
      comments,
      count: countOffer,
      firstnames,
      lastnames,
      emails,
      passwords,
    };

    const content = generateFillingCode(parameters);

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.success);
    } catch (error) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.error);
    }
  }
};
