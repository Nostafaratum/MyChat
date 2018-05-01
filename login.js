'use strict';

import { User, AuthError } from '../model/user';
import { NotFoundError } from '../error';

exports.get = (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.locals.user = null;
  }

  res.render("pages/login", { title: "Authorization" });
};

exports.post = (req, res, next) => {
  if (!req.body) return res.sendStatus(400);

  let username = req.body.username;
  let password = req.body.password;
  let user = new Promise((response) => {
    response(User.findOne({ username: username}));
  });
  user
    .then(user => {
      if (user && user.password === password) {
        req.session.user = user._id;
        res.locals.user = req.user = user;
        res.send({ user });
      }
      else {
        console.log("AuthError");
        next(new AuthError('User not found'));
      }
    })
    .catch((err) => {
      console.log("err")
      next(err);
    });
};
