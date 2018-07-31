const express = require('express');
const router = express.Router();
const http = require('http');
const twilio = require('twilio');

/* GET home page. */
router.post('/getMapDetails', function(req, res, next) {

  //Google Map API
  const googleMapsClient = require('@google/maps').createClient({
    key: 'API-KEY',
    Promise: Promise
  });

  const distanceParams = {
    origins: req.body.origins,
    destinations: req.body.destinations
  }
  googleMapsClient.distanceMatrix(distanceParams)
  .asPromise()
  .then(
    function (response) {
      res.send(response.json.rows[0].elements[0]);
    },
    function (error) {
      res.send(error.json.error_message);
    });

  // Near By
  const nearBy = {
    location: req.body.location,
    radius: Number(req.body.radius),
    type: req.body.type,
    keyword: req.body.keyword
  }
  googleMapsClient.placesNearby(nearBy)
    .asPromise()
    .then(
      function (response) {
        res.send(response.json.results);
      },
      function (error) {
        res.send(error.json.error_message);
      }
    );

});

module.exports = router;
