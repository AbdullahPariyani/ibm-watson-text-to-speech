const { stringify } = require("nodemon/lib/utils");

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      speechURL: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const TextToSpeech = mongoose.model("textToSpeech", schema);
  return TextToSpeech;
};
