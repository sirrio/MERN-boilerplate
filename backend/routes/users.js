var express = require('express');
var router = express.Router();

const user = require('../models/users');

router
  .route('/')
  .get((request, response) => {
    user.find((error, _user) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(200).json(_user);
      }
    });
  })
  .post((request, response) => {
    const body = request.body;
    user.find({ username: body.name }, (error, _user) => {
      if (error) {
        response.status(500).send(error);
      } else {
        user.create(request.body, (error, _user) => {
          if (error) {
            response.status(500).send(error);
          } else {
            response.status(201).json(_user);
          }
        });
      }
    });
  });

module.exports = router;
