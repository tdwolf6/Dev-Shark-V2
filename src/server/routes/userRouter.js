const express = require('express');
const userController = require('../controllers/userController');
const favoritesController = require('../controllers/favoritesController');
const router = express.Router();

router.get('/', userController.validateToken, (req, res) => {
  return res.status(200).json({ user_id: res.locals.users_id });
});

router.post(
  '/',
  userController.verifyUser,
  favoritesController.getFavTechs,
  favoritesController.getFavResources,
  (req, res) => {
    // send login confirmation and user info back to frontend
    return res.status(200).json({
      currentUser: res.locals.currentUser,
      favTechs: res.locals.favTechs,
      favResources: res.locals.favResources,
    });
  }
);

router.post(
  '/favorite',
  userController.validateToken,
  favoritesController.checkFavResource,
  favoritesController.addFavResource,
  favoritesController.getFavResources,
  (req, res) => {
    return res.status(200).json({ favoriteResources: res.locals.favResources });
  }
);

router.delete(
  '/favorite',
  userController.validateToken,
  favoritesController.removeFavResource,
  favoritesController.getFavResources,
  (req, res) => {
    return res.status(200).json({ favoriteResources: res.locals.favResources });
  }
);

// get all favorite resources from this particular user
router.get(
  '/favorite',
  userController.validateToken,
  favoritesController.getFavResources,
  (req, res) => {
    return res.status(200).json({ favoriteResources: res.locals.favResources });
  }
);

module.exports = router;
