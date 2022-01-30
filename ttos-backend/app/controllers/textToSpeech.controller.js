
const db = require("../models");
const TextToSpeech = db.TextToSpeech;
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const { v4: uuidv4 } = require('uuid');
const aws = new (require('../config/aws.config'))()
const { errorMsg, synthesizeParams, textToSpeechParam } = require('../config/constants')


exports.create = async (req, res) => {
  try {
    const textToSpeechObject = new TextToSpeechV1({
      authenticator: new IamAuthenticator({
        apikey: textToSpeechParam.apikey
      }),
      serviceUrl: textToSpeechParam.serviceUrl
    });
    const response = await textToSpeechObject.synthesize({
      text: req.body.title,
      accept: synthesizeParams.accept,
      voice: synthesizeParams.accept.voice
    });
    if (!response)
      res.status(500).send({ message: errorMsg.message + 'synthesize' });

    const buffer = await textToSpeechObject.repairWavHeaderStream(response.result);
    if (!buffer)
      res.status(500).send({ message: errorMsg.message + 'repairWavHeaderStream' });
    let s3Data = await aws.upload({
      Key: `${uuidv4()}.mp3`,
      Body: buffer
    });
    if (!s3Data)
      res.status(500).send({ message: errorMsg.message + 's3' });
    const textToSpeech = await new TextToSpeech({
      title: req.body.title,
      fileName: s3Data.key
    });

    let speechDataResponse = await textToSpeech.save(textToSpeech);
    speechDataResponse.speechURL = await aws.getPublicUrl(speechDataResponse.fileName)
    res.status(200).send(speechDataResponse);
  } catch (e) {
    res.status(500).send({ message: errorMsg.internalServer });
  }
};

// Retrieve all TextToSpeech from the database.
exports.findAll = async (req, res) => {
  try {
    const title = req.query && req.query.title && req.query.title.trim();
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    let result = await TextToSpeech.find(condition).sort({ 'updatedAt': -1 });
    for (let i = 0; i < result.length; i++) {
      result[i].speechURL = await aws.getPublicUrl(result[i].fileName)
    }
    res.status(200).send(result);
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: errorMsg.retrievedError });
  }
};
