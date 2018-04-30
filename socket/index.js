'use strict';

import { User } from '../model/user';
import SessionStore from '../lib/sessionStore';

module.exports = server => {
  let io = require("socket.io", {
    serveClient: false,
    origins: ["localhost:3000"]
  }).listen(server);

  let chat = io
    .of("/chat")
    .on("connection", socket => {
      let promise = new Promise((response) => {
        let sid = socket.request.headers.cookie.split('%')[1].split('.')[0].slice(2);
        SessionStore.load(sid, (err, session) => { 
          User.findById(session.user, (err, user) => {
            if (err) return reject(err);
            socket.request.user = user;
            response(socket.request.user);
          });
        });
      });
      promise
        .then(user => {
          socket.broadcast.emit("connected new user", user.username);
        })
        .catch(err => {
          console.log(err);
        });
      socket.on("chat message", msg => {
        socket.emit("chat message", socket.request.user.username + ": " + msg);
        socket.broadcast.emit("chat message", socket.request.user.username + ": " + msg);
      });
    });
};