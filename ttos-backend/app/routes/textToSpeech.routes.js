module.exports = app => {
  const TextToSpeech = require("../controllers/textToSpeech.controller.js");

  var router = require("express").Router();

  // Create a new TextToSpeech
  router.post("/", TextToSpeech.create);

  // Retrieve all TextToSpeech
  router.get("/", TextToSpeech.findAll);

  // Retrieve a single TextToSpeech with id
  router.get("/:id", TextToSpeech.findOne);

  app.use("/api/TextToSpeech", router);
};
