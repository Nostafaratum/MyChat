'use strict';

require('babel-register');
let mongoose = require("./lib/mongoose");

function promise(){
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 50);
  });
}

promise()
  .then(() => {
    console.log("open");
    mongoose.connection.on("connected", () => {});
    return promise();
  })
  .then(() => {
    console.log("dropDB");
    let db = mongoose.connection.db;
    db.dropDatabase();
    return promise();
  })
  .then(() => {
    console.log("requireModel");
    require("./model/user");
    Object.keys(mongoose.models).forEach(modelName => {
      mongoose.models[modelName].ensureIndexes();
    });
    return promise();
  })
  .then(() => {
    console.log("createUser");
    let users = [
      { username: "admin", password: "admin" },
    ];
    users.forEach(userData => {
      let user = new mongoose.models.user(userData);
      user.save();    
    });
  })
  .catch((err) => {
    console.log(err);
  });