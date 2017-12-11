/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const GoogleStrategy = require('passport-google-auth').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const userModel = require('./model/user.model');

const hasEnvKeys = process.env.GOOGLE_CLIENT_ID;

/*
 * If the environment has a google client Id, then use that as a keystore,
 * otherwise look for a locally defined file.
 */
const keyStore = hasEnvKeys ? process.env : require('../env.vars.local'); // eslint-disable-line

const googleConfig = {
  clientId: keyStore.GOOGLE_CLIENT_ID,
  clientSecret: keyStore.GOOGLE_CLIENT_SECRET,
  callbackURL: keyStore.GOOGLE_CALLBACK_URL,
};

function localStrategy(username, password, done) {
  userModel
    .findUserByCredentials(username, password)
    .then(
      (user) => {
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      },
      (err) => {
        if (err) {
          return done(err);
        }
        return done('Something went wrong during local authentication');
      },
    );
}

function googleStrategy(token, refreshToken, profile, done) {
  userModel
    .findUserByGoogleId(profile.id)
    .then(
      (user) => {
        if (user) {
          return done(null, user);
        }
        // TODO: only allow new users from NEU domains.
        const newGoogleUser = {
          username: profile.name.givenName + profile.name.familyName,
          lastName: profile.name.familyName,
          firstName: profile.name.givenName,
          email: profile.emails[0].value,
          google: {
            id: profile.id,
            token,
          },
          roles: ['STUDENT'],
        };

        const createUsername = (num) => {
          return userModel.findUserByUsername(newGoogleUser.username + num).then((usr) => {
            if (!usr) {
              newGoogleUser.username += num;
              return userModel.createUser(newGoogleUser);
            }
            return createUsername(num + 1);
          }, () => {
            newGoogleUser.username += num;
            return userModel.createUser(newGoogleUser);
          });
        };

        return userModel.findUserByUsername(newGoogleUser.username).then((usr) => {
          if (!usr) {
            return userModel.createUser(newGoogleUser);
          }
          return createUsername(0);
        }, () => {
          return userModel.createUser(newGoogleUser);
        });
      },
      (err) => {
        return done(err);
      },
    ).then(
      (user) => {
        return done(null, user);
      },
      (err) => {
        return done(err);
      },
    );
}

function register(req, res) {
  const newUser = req.body;
  newUser.email = newUser.username;
  newUser.roles = ['FACULTY', 'ADMIN'];

  userModel.findUserByUsername(newUser.username).then(
    (user) => {
      if (!user) {
        return userModel.createUser({
          username: newUser.username,
          password: newUser.password,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          roles: newUser.roles,
        }).then(
          (existingUser) => {
            if (existingUser) {
              req.login(existingUser, (err) => {
                if (err) {
                  res.status(400).send(err);
                } else {
                  res.json(existingUser);
                }
              });
            }
          },
          (err) => {
            res.status(400).send(err);
          },
        );
      }
      return res.status(400).send('User of given username already exists').end();
    },
    () => {
      return userModel.createUser({
        username: newUser.username,
        password: newUser.password,
        roles: newUser.roles,
      }).then(
        (user) => {
          if (user) {
            req.login(user, (err) => {
              if (err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
            });
          }
        },
        (err) => {
          res.status(400).send(err);
        },
      );
    },
  );
}

function serializeUser(user, done) {
  done(null, user);
}

function deserializeUser(user, done) {
  userModel
    .findUserById(user._id)
    .then(
      (usr) => {
        done(null, usr);
      },
      (err) => {
        done(err, null);
      },
    );
}

function loggedIn(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
}

function logout(req, res) {
  req.logOut();
  res.sendStatus(200);
}

const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

function login(req, res) {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.send(false);
  }
}

passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

const localAuth = passport.authenticate('local');

const googleAuthCallback = passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/login',
});


module.exports = {
  googleAuth,
  googleAuthCallback,
  register,
  loggedIn,
  logout,
  login,
  localAuth,
};
