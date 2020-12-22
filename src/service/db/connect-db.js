'use strict';

const Sequelize = require(`sequelize`);
const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_DIALECT,
} = require(`../../../config-env`);
const {
  getLogger
} = require(`../../logger/logger`);
const logger = getLogger();
const {
  ExitCode
} = require(`../../constants`);
const {
  users,
  types,
  offers,
  categories,
  offersCategories,
  comments,
} = require(`../../../fill-db`);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

const User = require(`./models/user`)(sequelize);
const Offer = require(`./models/offer`)(sequelize);
const Type = require(`./models/type`)(sequelize);
const Comment = require(`./models/comment`)(sequelize);
const Category = require(`./models/category`)(sequelize);

User.hasMany(Offer, {
  as: `offers`,
  foreignKey: `authorId`,
});

Offer.belongsTo(User, {
  as: `author`,
  foreignKey: `authorId`,
});

Type.hasMany(Offer, {
  as: `offers`,
  foreignKey: `typeId`
});

Offer.belongsTo(Type, {
  as: `type`,
  foreignKey: `typeId`,
});

Offer.hasMany(Comment, {
  as: `comments`,
  foreignKey: `offerId`,
});

Comment.belongsTo(Offer, {
  as: `offer`,
  foreignKey: `offerId`,
});

User.hasMany(Comment, {
  as: `comments`,
  foreignKey: `authorId`,
});

Comment.belongsTo(User, {
  as: `author`,
  foreignKey: `authorId`,
});

const OffersCategories = sequelize.define(`Offers_Categories`, {}, {
  timestamps: false,
  paranoid: false,
});

Offer.belongsToMany(Category, {
  through: OffersCategories,
  as: `categories`,
  foreignKey: `offerId`,
});

Category.belongsToMany(Offer, {
  through: OffersCategories,
  as: `offers`,
  foreignKey: `categoryId`,
});

const connect = async () => {
  logger.debug(`Start connecting to the data base...`);
  try {
    await sequelize.authenticate();
    logger.debug(`Connected successfully!`);
  } catch (err) {
    logger.error(`Connection error: ${err}`);
    process.exit(ExitCode.error);
  }
};

const initDb = async () => {
  await sequelize.sync({
    force: true
  });

  await User.bulkCreate(users);
  await Type.bulkCreate(types);
  await Category.bulkCreate(categories);
  await Offer.bulkCreate(offers);
  await OffersCategories.bulkCreate(offersCategories);
  await Comment.bulkCreate(comments);

  logger.debug(`The stucture of the db is successfully created!`);
};

module.exports = {
  models: {
    User,
    Offer,
    Type,
    Comment,
    Category,
    OffersCategories
  },
  initDb,
  connect,
  sequelize,
};
