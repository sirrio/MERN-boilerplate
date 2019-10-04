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
    const data = request.body.data;
    user.create(data, (error, _user) => {
      if (error) {
        console.log(error);
        response.status(500).send(error);
      } else {
        response.status(201).json(_user);
      }
    });
  });

router
  .route('/:id')
  .put((request, response) => {
    console.log(request.params.id);
    console.log(request.body);
    user.findByIdAndUpdate(request.params.id, request.body, (error, _user) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(200).json(_user);
      }
    });
  })
  .delete((request, response) => {
    user.findByIdAndRemove(request.params.id, (error, result) => {
      if (error) {
        console.log(error);
        response.status(500).send(result);
      } else {
        response.status(200).json(result);
      }
    });
  });

module.exports = router;
