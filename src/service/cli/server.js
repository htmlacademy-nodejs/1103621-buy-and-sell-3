'use strict';

const {
  HttpCode,
  API_PREFIX
} = require(`../../constants`);
const express = require(`express`);
const routes = require(`../api`);
const {
  getLogger
} = require(`../../logger/logger`);
const logger = getLogger();
const expressPinoLogger = require(`express-pino-logger`)({
  logger
});
const db = require(`../db/connect-db`);

const DEFAULT_PORT = 3000;

const app = express();


const init = async (database) => {
  app.use(express.json());
  app.use(expressPinoLogger);
  app.use(API_PREFIX, await routes(database));

  app.use((req, res) => {
    res
      .status(HttpCode.NOT_FOUND)
      .send(`The page is not found!`);

    logger.error(`Such a route doesn't exist: ${req.url}`);
  });

  return app;
};

module.exports = {
  name: `--server`,
  init,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    await db.connect();
    await db.initDb();
    await init(db);

    app.listen(port, () => {
      logger.info(`Wait for connections on port ${port}`);
    })
      .on(`error`, (err) => {
        logger.error(`Error: ${err}`);
        process.exit(1);
      });

  }
};
