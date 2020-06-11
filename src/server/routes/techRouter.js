const express = require('express');
const userController = require('../controllers/userController');
const techController = require('../controllers/techController');
const router = express.Router();

router.post(
  '/',
  userController.validateToken,
  techController.addTech,
  (req, res) => {
    res.status(200).send(req.body.tech);
  }
);

module.exports = router;
