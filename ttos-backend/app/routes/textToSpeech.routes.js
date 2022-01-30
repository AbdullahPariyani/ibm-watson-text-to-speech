module.exports = app => {
  const TextToSpeech = require("../controllers/textToSpeech.controller.js");
  const textToSpeechValidator = require('../validators/textToSpeech.validators.js');
  var router = require("express").Router();

  // Create a new TextToSpeech
  router.post("/", textToSpeechValidator.create, TextToSpeech.create);

  // Retrieve all TextToSpeech
  router.get("/", TextToSpeech.findAll);

  app.use("/api/TextToSpeech", router);
};
