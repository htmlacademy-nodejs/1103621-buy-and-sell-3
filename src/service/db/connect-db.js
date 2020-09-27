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
  tickets,
  categories,
  ticketsCategories,
  comments,
} = require(`../../../fill-db`);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

const User = require(`./models/user`)(sequelize);
const Ticket = require(`./models/ticket`)(sequelize);
const Type = require(`./models/type`)(sequelize);
const Comment = require(`./models/comment`)(sequelize);
const Category = require(`./models/category`)(sequelize);

User.hasMany(Ticket, {
  as: `tickets`,
  foreignKey: `authorId`,
});

Ticket.belongsTo(User, {
  as: `author`,
  foreignKey: `authorId`,
});

Type.hasMany(Ticket, {
  as: `tickets`,
  foreignKey: `typeId`
});

Ticket.belongsTo(Type, {
  as: `type`,
  foreignKey: `typeId`,
});

Ticket.hasMany(Comment, {
  as: `comments`,
  foreignKey: `ticketId`,
});

Comment.belongsTo(Ticket, {
  as: `ticket`,
  foreignKey: `ticketId`,
});

User.hasMany(Comment, {
  as: `comments`,
  foreignKey: `authorId`,
});

Comment.belongsTo(User, {
  as: `author`,
  foreignKey: `authorId`,
});

const TicketsCategories = sequelize.define(`Tickets_Categories`, {}, {
  timestamps: false,
  paranoid: false,
});

Ticket.belongsToMany(Category, {
  through: TicketsCategories,
  as: `categories`,
  foreignKey: `ticketId`,
});

Category.belongsToMany(Ticket, {
  through: TicketsCategories,
  as: `tickets`,
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
  await Ticket.bulkCreate(tickets);
  await TicketsCategories.bulkCreate(ticketsCategories);
  await Comment.bulkCreate(comments);

  logger.debug(`The stucture of the db is successfully created!`);
};

module.exports = {
  models: {
    User,
    Ticket,
    Type,
    Comment,
    Category,
  },
  initDb,
  connect,
  sequelize,
};
