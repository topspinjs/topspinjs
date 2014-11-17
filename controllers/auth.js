module.exports = function (app, passport) {

  var facebook_url
    , qr = require('qr-image')
    , events = app.get('events')
    , config = app.get('config')
    , bookshelf = app.get('bookshelf')
    , Player = require('../models/player')(bookshelf)
    , FacebookStrategy = require('passport-facebook').Strategy;

  facebook_url = "http://" + config.domain + ":" + config.port + "/auth/facebook";

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new FacebookStrategy({
      clientID: config.facebook_app_id,
      clientSecret: config.facebook_app_secret,
      callbackURL: facebook_url + '/callback',
      enableProof: false
    },
    function (accessToken, refreshToken, profile, done) {
      Player.forge({
        name: profile.displayName
      , gender: profile.gender
      }).save().then(function (player) {
        events.emit('players.new', player);
        return done(null, player);
      });
    }
  ));

  app.get('/auth/qrcode.png', function (req, res) {
    var code = qr.image(facebook_url, { type: 'svg' });
    res.type('svg');
    code.pipe(res);
  });

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),

    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    }
  );
};
