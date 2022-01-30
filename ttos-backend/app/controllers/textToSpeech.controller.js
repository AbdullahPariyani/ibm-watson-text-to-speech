require('dotenv').config()
const db = require("../models");
const TextToSpeech = db.TextToSpeech;
const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const {
  IamAuthenticator
} = require('ibm-watson/auth');
const AWS = require('aws-sdk');
const {
  v4: uuidv4
} = require('uuid');
let fetchFile = new (require('./fileManager'))()

// Create and Save a new TextToSpeech
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const errorMsg = {
    message: "Some went wrong..."
  }

  const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
      apikey: process.env.I_AM_AUTHENTICATOR_API_KEY,
    }),
    serviceUrl: process.env.I_AM_AUTHENTICATOR_SERVICE_URL,
  });

  const synthesizeParams = {
    text: req.body.title,
    accept: 'audio/wav',
    voice: 'en-US_AllisonV3Voice'
  };

  const s3 = new AWS.S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
  });

  textToSpeech.synthesize(synthesizeParams).then(response => {
    return textToSpeech.repairWavHeaderStream(response.result);
  }).then(buffer => {
    // fs.writeFileSync('hello_world.mp3', buffer);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${uuidv4()}.mp3`,
      Body: buffer
    }

    s3.upload(params, async (error, s3Data) => {
      if (error) {
        res.status(500).send(errorMsg + ': S3');
      }
      const textToSpeech = new TextToSpeech({
        title: req.body.title,
        speechURL: await fetchFile.getPublicUrl(s3Data.key)
      });

      // Save TextToSpeech in the database
      textToSpeech.save(textToSpeech).then(speechDataResponse => {
        res.send(speechDataResponse);
      }).catch(err => {
        res.status(500).send(errorMsg + ': textToSpeech');
      });
    });

  }).catch(err => {
    res.status(500).send(errorMsg + ': main');
  });
};

// Retrieve all TextToSpeech from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? {
    title: {
      $regex: new RegExp(title),
      $options: "i"
    }
  } : {};

  TextToSpeech.find(condition).sort({
    'updatedAt': -1
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving TextToSpeech."
      });
    });
};

// Find a single TextToSpeech with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  TextToSpeech.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({
          message: "Not found TextToSpeech with id " + id
        });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({
          message: "Error retrieving TextToSpeech with id=" + id
        });
    });
};