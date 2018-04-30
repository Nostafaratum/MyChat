'use strict'

import express from 'express';
import http from 'http';
import config from './config';
import path from 'path';
import pug from 'pug';
import morgan from 'morgan';
import session from 'express-session';
import mongoose from './lib/mongoose';
import SessionStore from './lib/sessionStore';
import errorhandler from 'errorhandler';//let ErrorHeandler = require("errorhandler");

let log = require("./lib/logger")(module);

let app = express();

app.set("views", __dirname + "/template");
app.set("view engine", "pug");

app.use(
  require("serve-favicon")(path.join(__dirname, "public", "favicon.ico"))
); // /favicon.ico

app.use(express.static(__dirname + "/public"));


if (app.get("env") == "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("default"));
}

app.use(require("body-parser")());

app.use(require("cookie-parser")());

app.use(
  session({
    secret: config.get("session:secret"),
    key: config.get("session:key"),
    cookie: config.get("session:cookie"),
    resave: config.get("session:resave"),
    saveUninitialized: config.get("session:saveUninitialized"),
    store: SessionStore
  })
);

app.use(require("./middleware/sendHttpError"));
app.use(require("./middleware/loadUser"));

app.use((err, req, res, next) => {
  next(err);
});

require("./routes")(app);

let server = http.createServer(app);

require("./socket")(server);

server.listen(config.get("port"), () => {
  console.log("express server listening on port " + config.get("port"));
});