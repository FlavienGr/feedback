require("./db/mongodb");
const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./services/passport");
const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const path = require("path");
const { COOKIES_KEYS } = process.env;
const PORT = process.env.PORT || 5000;

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [COOKIES_KEYS]
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(billingRoutes);
app.use(surveyRoutes);
app.use(authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`listen on port:${PORT}`);
});
