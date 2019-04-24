const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      const profileKey = Array.from(profile.emails);
      console.log(`accessToken : ${accessToken}`);
      console.log(profileKey);
      console.log(`profile name : ${profile.name}`);
      console.log(`profile: ${profile}`);
      console.log(`refreshToken : ${refreshToken}`);
      console.log(`cb : ${cb}`);
    }
  )
);
