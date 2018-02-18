const passport = require("passport");
const { User } = require("../models");
const { Strategy: LocalStrategy } = require("passport-local");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId, done);
});

const option = {
  usernameField: "email",
  passwordField: "password"
};

passport.use(
  "local-reg",
  new LocalStrategy(option, (email, password, done) => {
    User.create({ email, password })
      .then(user => done(null, user))
      .catch(done);
  })
);

passport.use(
  "local-login",
  new LocalStrategy(option, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) return done(null, false);

        user.isCorrectPassword(password)
          .then(isEqual => {
            if (!isEqual) return done(null, false);

            done(null, user);
          })
          .catch(done);
      })
      .catch(done);
  })
);

module.exports = passport;
