const express = require('express');
const userController = require('../controllers/userController');
const favoritesController = require('../controllers/favoritesController');
const voteController = require('../controllers/voteController');
const resourceController = require('../controllers/resourceController');
const router = express.Router();

router.get(
  '/',
  userController.validateToken,
  favoritesController.getFavIds,
  (req, res) => {
    return res.status(200).json({
      user_id: res.locals.users_id,
      favResources: res.locals.favIds,
    });
  }
);

router.post(
  '/',
  userController.verifyUser,
  favoritesController.getFavTechs,
  favoritesController.getFavIds,
  (req, res) => {
    // send login confirmation and user info back to frontend
    return res.status(200).json({
      currentUser: res.locals.currentUser,
      favTechs: res.locals.favTechs,
      favResources: res.locals.favIds,
    });
  }
);

router.post(
  '/favorite',
  userController.validateToken,
  favoritesController.checkFavResource,
  favoritesController.addFavResource,
  favoritesController.getFavIds,
  (req, res) => {
    return res.status(200).json({ favoriteResources: res.locals.favIds });
  }
);

router.delete(
  '/favorite',
  userController.validateToken,
  favoritesController.removeFavResource,
  favoritesController.getFavResources,
  favoritesController.getFavIds,
  (req, res) => {
    return res.status(200).json({
      favoriteResources: res.locals.favIds,
      resources: res.locals.favResources,
    });
  }
);

// get all favorite resources from this particular user
router.get(
  '/favorite',
  userController.validateToken,
  favoritesController.getFavResources,
  (req, res) => {
    return res.status(200).json(res.locals.favResources);
  }
);

// Upvote a resource and return the new list of resources
router.put(
  '/upvote',
  userController.validateToken,
  resourceController.addLike,
  resourceController.getResources,
  (req, res) => {
    return res.status(200).json(res.locals.resources);
  }
);

// Remove upvote on a resource and return the new list of resources
router.put(
  '/removeUpvote',
  userController.validateToken,
  resourceController.subtractLike,
  resourceController.getResources,
  (req, res) => {
    return res.status(200).json(res.locals.resources);
  }
);

// Downvote a resource and return the new list of resources
router.put(
  '/downvote',
  userController.validateToken,
  resourceController.subtractLike,
  resourceController.getResources,
  (req, res) => {
    return res.status(200).json(res.locals.resources);
  }
);

// Remove downvote on a resource and return the new list of resources
router.put(
  '/removedownvote',
  userController.validateToken,
  resourceController.addLike,
  resourceController.getResources,
  (req, res) => {
    return res.status(200).json(res.locals.resources);
  }
);

module.exports = router;
