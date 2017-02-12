/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {
  //ACTION NAME
  login: function(req, res){
      res.view();
  },

  logout: function(req, res){
      req.session.user = null,
      req.session.flash = 'Logged out successfully';
      res.redirect('user/login');
  },

  dashboard: function(req, res){
      res.view();
  },

  create: function(req, res) {
    //This is what the action will do
    //Creates a User in the database based on
    var params = req.params.all();
    User.create({
        email: params.email,
        password: params.password,
        facebookId: params.facebookId
      })
      //CALLBACK ON SUCCESS OR FAIL
      .exec(function createCB(err, created) {
        // console.log(res.status());
        return (err ? res.json(400, err): res.json(202,created) );
      });
  },

  'facebook' : function(req, res, next){
      passport.authenticate('facebook', {scope: ['email', 'user_about_me']},
          function(err, user){
              req.logIn(user, function(err){
                  if(err){
                      req.session.flash = 'Error';
                      res.redirect('user/login');
                  }
                  else{
                      req.session.user = user;
                      res.redirect('/user/dashboard');
                  }
              });
          })(req, res, next);
     },

     'facebook/callback': function(req, res, next){
         passport.authenticate('facebook',
            function(req, res){
                res.redirect('/user/dashboard');
            })(req, res, next);
     }
};
