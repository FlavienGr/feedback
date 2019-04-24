const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const User = require("../model/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({ googleId: profile.id });
      }
      try {
        await user.save();
        cb(null, user);
      } catch (e) {
        cb(e, null);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});
passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id);
  cb(null, user);
});
