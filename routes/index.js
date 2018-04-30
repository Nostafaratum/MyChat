"use script";
import { NotFoundError } from "../error";

module.exports = app => {
  app.get("/", require("./frontpage").get);

  app.get("/login", require("./login").get);
  app.post("/login", require("./login").post);

  app.get("/registration", require("./registration").get);
  app.post("/registration", require("./registration").post);
  
  app.get("/chat", require("./chat").get)
  
  app.get("/textAboutHtml", require("./aboutHtml").get);

  app.use((req, res, next) => {
    next(new NotFoundError("404, Page not found"));
  });
};
