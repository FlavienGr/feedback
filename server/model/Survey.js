const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const SurveySchema = Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  dateSent: Date,
  lastResponded: Date
});

const Survey = mongoose.model("Survey", SurveySchema);
module.exports = Survey;
