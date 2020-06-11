const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post(
  '/',
  userController.verifyUser,
  userController.getFavTechs,
  userController.getFavResources,
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
  userController.checkFavResource,
  userController.addFavResource,
  (req, res) => {
    return res.status(200).json(res.locals.users_id);
  }
);

router.delete(
  '/favorite',
  userController.validateToken,
  userController.removeFavResource,
  (req, res) => {
    return res.status(200).end();
  }
);

// router.get('/favorite', userController.validateToken, etc..)
// get all favorite resources from this particular user

module.exports = router;
