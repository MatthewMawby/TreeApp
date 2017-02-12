var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  bcrypt = require('bcrypt');

function findByFacebookId(id, fn){
    User.findOne({
        facebookId: id
    }).done(function(err, user){
        if (err){
            return fn(null, null);
        }
        else{
            return fn(null, user);
        }
    })
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({
    id: id
  }, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {

    User.findOne({
      email: email
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect email.'
        });
      }

      bcrypt.compare(password, user.password, function(err, res) {
        if (!res)
          return done(null, false, {
            message: 'Invalid Password'
          });
        var returnUser = {
          email: user.email,
          createdAt: user.createdAt,
          id: user.id
        };
        return done(null, returnUser, {
          message: 'Logged In Successfully'
        });
      });
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: 'ClientID',
    clientSecret: 'clientSecret',
    callbackURL: 'http://localhost:1337/user/facebook/callback',
    enableProof: false
}, function(accessToken, refreshToken, profile, done){
    findByFacebookId(profile.id, function(err, user){
        if (!user){
            user.create({
                facebookId: profile.id
            }).done(function(err, user){
                if (user){
                    return done(null, user, { message: 'Logged In Successfully'});
                }
                else{
                    return done(err, null, { message: 'There was an error logging in with Facebook'});
                }
            });
        }
    });
}));
