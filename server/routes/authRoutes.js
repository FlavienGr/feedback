const express = require("express");
const route = express.Router();
const passport = require("passport");

route.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

route.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/surveys",
    failureRedirect: "/"
  })
);

route.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
route.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = route;
