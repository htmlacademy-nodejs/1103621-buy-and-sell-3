'use strict';

const express = require(`express`);

const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);
const offersRoutes = require(`./routes/offers-routes`);

const DEFAULT_PORT = 8080;

const app = express();

app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);
app.use(`/`, mainRoutes);

app.listen(DEFAULT_PORT);
