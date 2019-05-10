const express = require("express");
const route = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const auth = require("../middlewares/auth");
route.post("/api/stripe", auth, async (req, res) => {
  // Token is created using Checkout or Elements!
  // Get the payment token ID submitted by the form:
  const token = req.body.id; // Using Express
  const charge = await stripe.charges.create({
    amount: 500,
    currency: "usd",
    description: "5 email credits",
    source: token
  });
  req.user.credits += 5;
  const user = await req.user.save();
  res.send(user);
});
module.exports = route;
