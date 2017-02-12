/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //ACTION NAME
  login: function(req, res){
      res.view();
  },

  logout: function(req, res){
      req.session.user = null,
      req.session.flash = 'Logged out successfully';
      res.redirect('user/login');
  }
  
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
};
