const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
const express = require("express");
const route = express.Router();
const auth = require("../middlewares/auth");
const credits = require("../middlewares/credits");
const sendSurveyEmail = require("../email/account");
const Survey = require("../model/Survey");

route.get("/api/survey/:surveyId/:choice", (req, res) => {
  res.send("Thanks for voting");
});
route.get("/api/survey", auth, async (req, res) => {
  try {
    const survey = await Survey.find({ owner: req.user.id }).select({
      recipients: false
    });
    res.status(200).send(survey);
  } catch (error) {
    res.status(401).send(e);
  }

  res.send(survey);
});
route.post("/api/survey/webhooks", (req, res) => {
  const p = new Path("/api/survey/:surveyId/:choice");

  _.chain(req.body)
    .map(({ url, email }) => {
      const match = p.test(new URL(url).pathname);
      if (match) {
        const { surveyId, choice } = match;
        return { email, surveyId, choice };
      }
    })
    .compact()
    .uniqBy("email", "surveyId")
    .each(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
          lastResponded: new Date()
        }
      ).exec();
    })
    .value();

  res.send({});
});
route.post("/api/survey", auth, credits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = await new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(",").map(email => ({ email: email.trim() })),
    owner: req.user._id,
    dateSent: Date.now()
  });

  try {
    sendSurveyEmail(survey);
    req.user.credits -= 1;
    const user = await req.user.save();
    await survey.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(422).send(e);
  }
});

module.exports = route;
