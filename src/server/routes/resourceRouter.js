const express = require('express');
const resourceController = require('../controllers/resourceController');
const router = express.Router();

// retrieves all topics in database to render when no user is logged in / user logs out, returns an array of string topics
router.get('/getTopics', resourceController.getTopics, (req, res) => {
  return res.status(200).json(res.locals.topics);
});

// when name (tech_name) is triggered
// return array of resources for that tech(i.e. React) from database
// send results to front-end( store in state)
// to be used to populate data cards in Feed Container, Feed Item Container, Feed Item
router.get('/:name', resourceController.getResources, (req, res) => {
  // USE console.log to SEE resource object => console.log('Send array of resources from get Resources', res.locals.resources);
  return res.status(200).json(res.locals.resources);
});

// when a post request is made to localhost/resources/:name from the store
// Add new resource to the database and return the new list of resources
router.post(
  '/',
  // adds resource by getting TechId for the tech_name inputted(i.e. react)
  // PLEASE NOTE: RESOURCES Table does not take in tech_name(aka tech)
  // ONLY TECHS table knows tech
  // so we must get tech_id before placing the resource in the Resources Table
  resourceController.getTechId,
  resourceController.addResource,
  resourceController.getResources,
  (req, res) => {
    return res.status(200).json(res.locals.resources);
  }
);

module.exports = router;
