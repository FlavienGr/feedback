require("./db/mongodb");
const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./services/passport");
const authRoutes = require("./routes/authRoutes");
const PORT = process.env.PORT || 5000;
const { COOKIES_KEYS } = process.env;

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [COOKIES_KEYS]
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

app.listen(PORT, () => {
  console.log(`listen on port:${PORT}`);
});
