var request = require('supertest');

describe('UserController', function() {


  describe('#signup()', function() {
    it('should allow standard signup', function(done) {
      request(sails.hooks.http.app)
        .post('/User')
        .send({
          email: 'good@email.com',
          password: 'goodPass123'
        }).expect(202, done);
    });
    it('should not allow with bad password', function(done) {
      request(sails.hooks.http.app)
        .post('/User')
        .send({
          email: 'bad@email.com',
          password: '23'
        }).expect(400, done);
    });
    it('should not allow duplicate emails', function(done) {
      request(sails.hooks.http.app)
        .post('/User')
        .send({
          email: 'good@email.com',
          password: 'goodPass12345'
        }).expect(400, done);
    });
  });

  describe('#login()', function() {
    it('should not allow an unauthenticated email', function(done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({
          email: 'random@email.com',
          password: 'test'
        })
        .expect({
          "message": "Incorrect email.",
          "user": false
        }, done);
      // .expect('location','/mypage', done);
    });
    // it('should login an authenticated user', function(done) {
    //   request(sails.hooks.http.app)
    //     .post('/login')
    //     .send({
    //       email: 'test',
    //       password: 'test'
    //     })
    //     .expect(302)
    //     .expect('location', '/mypage', done);
    // });
  });

});