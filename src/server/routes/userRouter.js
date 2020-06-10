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
    res.status(200).json({
      currentUser: res.locals.currentUser,
      favTechs: res.locals.favTechs,
      favResources: res.locals.favResources,
    });
  }
);

module.exports = router;
