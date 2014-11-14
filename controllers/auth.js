module.exports = function (app, passport) {

  var callback_url,
      qr = require('qr-image'),
      config = app.get('config'),
      FacebookStrategy = require('passport-facebook').Strategy;

  callback_url = "http://" + config.domain + ":" + config.port + "/auth/facebook/callback";

  passport.use(new FacebookStrategy({
      clientID: config.facebook_app_id,
      clientSecret: config.facebook_app_secret,
      callbackURL: callback_url,
      enableProof: false
    },
    function(accessToken, refreshToken, profile, done) {
      console.log('FCS', profile);
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  ));

  app.get('/auth/qrcode.png', function (req, res) {
    var code = qr.image(callback_url, { type: 'svg' });
    res.type('svg');
    code.pipe(res);
  });

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),

    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    }
  );
};
