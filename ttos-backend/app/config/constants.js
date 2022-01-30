require('dotenv').config()
exports.errorMsg = {
    internalServer: "Internal Server Error",
    retrievedError: "Some error occurred while retrieving TextToSpeech.",
    notFoundId: "Not found TextToSpeech with id - ",
    message: "something went wrong at "
}

exports.synthesizeParams = {
    accept: 'audio/wav',
    voice: 'en-US_AllisonV3Voice'
};

exports.textToSpeechParam = {
    apikey: process.env.I_AM_AUTHENTICATOR_API_KEY,
    serviceUrl: process.env.I_AM_AUTHENTICATOR_SERVICE_URL,
};