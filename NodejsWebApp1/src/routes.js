const express = require("express");
const path = require('path')
const router = express.Router();
const controller = require("../controller/file.controller");
const session = require("../controller/session.controller");
const algorithm = require("../controller/algorithm.controller");
const checksession = require("../middleware/checksession");

let routes = (app) => {
  router.post("/login", session.login); 
  router.get("/logout", session.logout);
  //router.get("/session", checksession.auth, session.session_check); // using for session check in server
  router.post("/smc-algo", algorithm.smc_algo); // substantiation
  router.post("/smc-algo-3h",algorithm.smc_algo_3hour); // substantiation
  router.post("/kumc-algo",algorithm.kumc_algo); // substantiation
  router.post("/survey",algorithm.survey); // substantiation

  router.get("/session", session.session_check); 
  router.post("/upload",controller.upload);
  router.get("/averaging", controller.Averaging);
  router.get("/files", controller.getListFiles);
  router.get("/readystat/:algo/:variation", controller.getReady);
  router.get("/files/:hos/:algo/:variation/:round/:name", controller.download);
  router.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../angular/dist/elf_demo/index.html'));
});

  router.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../react/build/index.html'));
});  // substantiation

  app.use(router);
};
module.exports = routes;