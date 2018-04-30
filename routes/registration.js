"use strict";

import { User, FoundError } from "../model/user";

exports.get = (req, res) => {
  res.render("pages/registration", { title: "Registration" });
};

exports.post = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  let promise = new Promise((respont) => {
      respont(User.findOne({ username: username }));
    });
  promise
    .then(user => {
      if (user instanceof User) {
        return Promise.reject(new FoundError("User already exists"));
      }
      else {
        user = new User({ username: username, password: password });
  
        user.save(err => {
          if (err) return Promise.reject(err);
        });
        return user;
      }
    })
    .then(user => {
      req.session.user = user._id;
      res.locals.user = req.user = user;
      res.send({ user });
    })
    .catch(err => {
      next(err);
    });
  };