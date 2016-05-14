/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //ACTION NAME
  create: function(req, res) {
    //This is what the action will do
    //Creates a User in the database based on
    var params = req.params.all();
    User.create({
        email: params.email,
        password: params.password
      })
      //CALLBACK ON SUCCESS OR FAIL
      .exec(function createCB(err, created) {
        // console.log(res.status());
        return (err ? res.json(400, err): res.json(202,created) );
      });
  },
};
