'use strict';

const express = require(`express`);
const path = require(`path`);
const formidableMiddleware = require(`express-formidable`);
const PUBLIC_DIR = `public`;

const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);
const offersRoutes = require(`./routes/offers-routes`);

const DEFAULT_PORT = 8080;

const app = express();

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(formidableMiddleware({
  encoding: `utf-8`,
  uploadDir: `./tmp`,
  multiples: false,
}));
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);
app.use(`/`, mainRoutes);

app.use((req, res) => {
  res.render(`errors/404`);
});

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(500)
    .render(`errors/500`);

  next();
});

app.listen(DEFAULT_PORT);
