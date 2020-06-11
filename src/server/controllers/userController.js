const db = require('./../db/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = {};

let item = '';
// verifyUser should check if user exists in database / is valid
userController.verifyUser = (req, res, next) => {
  const { email, password } = req.body;
  item =
    'SELECT u.users_id, u.email FROM users u WHERE email = $1 AND password = $2;';
  const values = [email, password];
  db.query(item, values)
    .then((query) => {
      if (!query.rows.length) {
        return res.status(400).send('Login Failed');
      }
      // make jwt, set in cookie
      const token = jwt.sign(email, process.env.JWT_SECRET);
      res.cookie('jwt', token);
      res.locals.currentUser = query.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: 'ERROR in userControllers.verifyUser',
        message: { err: `ERROR in userControllers.verifyUser ${err}` },
      });
    });
};

userController.validateToken = (req, res, next) => {
  // check incoming cookie and validate token before showing user-specific area
  const token = req.cookies.jwt;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // if decoded exists, jwt verification passed, pass users_id into locals and move onto next middleware
  if (decoded) {
    item = `SELECT users_id FROM users WHERE email = $1;`;
    const values = [decoded];
    db.query(item, values).then((query) => {
      res.locals.users_id = query.rows[0].users_id;
      return next();
    });
  } else {
    // figure out logic for what to do in front end. WHEN do they need to verify jwt, and what happens if it fails?
    return res.status(400).send('jwt verify failed');
  }
};

// getFavTechs checks for favorite tech topics to render in left navbar for current logged in user
userController.getFavTechs = (req, res, next) => {
  const { users_id } = res.locals.currentUser;
  item = `SELECT t.tech FROM users u INNER JOIN favorite_techs ft ON u.users_id = ft.users_id INNER JOIN techs t ON ft.techs_id = t.techs_id WHERE u.users_id = $1;`;
  const values = [users_id];
  db.query(item, values)
    .then((query) => {
      res.locals.favTechs = query.rows;
      return next();
    })
    .catch((err) =>
      next({
        log: 'ERROR in userControllers.getFavTechs',
        message: { err: `ERROR in userControllers.getFavTechs ${err}` },
      })
    );
};

// getFavResources for favorited resources for current logged in user
userController.getFavResources = (req, res, next) => {
  const { users_id } = res.locals.currentUser;
  item = `SELECT r.* FROM users u INNER JOIN favorite_resources fr ON u.users_id = fr.users_id INNER JOIN resources r ON fr.resources_id = r.resources_id WHERE u.users_id = $1;`;
  const values = [users_id];
  db.query(item, values)
    .then((query) => {
      res.locals.favResources = query.rows;
      return next();
    })
    .catch((err) =>
      next({
        log: 'ERROR in userControllers.getFavResources',
        message: { err: `ERROR in userControllers.getFavResources ${err}` },
      })
    );
};

// checks if resource is already favorited by user
userController.checkFavResource = (req, res, next) => {
  const { users_id } = res.locals;
  const { resources_id } = req.body;
  item = `SELECT * FROM favorite_resources WHERE users_id = $1 AND resources_id = $2;`;
  const values = [users_id, resources_id];
  db.query(item, values)
    .then((query) => {
      if (!query.rows[0]) {
        return next();
      } else {
        return res.status(400).send('Resource is already favorited!');
      }
    })
    .catch((err) => {
      return next({
        log: 'ERROR in userControllers.checkFavResource',
        message: { err: `ERROR in userControllers.checkFavResource ${err}` },
      });
    });
};

// adds favorite resource
userController.addFavResource = (req, res, next) => {
  const { users_id } = res.locals;
  const { resources_id } = req.body;
  item = `INSERT INTO favorite_resources (users_id, resources_id) VALUES ($1, $2);`;
  const values = [users_id, resources_id];
  db.query(item, values)
    .then((query) => {
      return next();
    })
    .catch((err) => {
      return next({
        log: 'ERROR in userControllers.addFavResource',
        message: { err: `ERROR in userControllers.addFavResource ${err}` },
      });
    });
};

// removes favorite resource
userController.removeFavResource = (req, res, next) => {
  const { users_id } = res.locals;
  const { resources_id } = req.body;
  item = `DELETE FROM favorite_resources WHERE users_id = $1 AND resources_id = $2;`;
  const values = [users_id, resources_id];
  db.query(item, values)
    .then((query) => {
      if (!query.rows.length) {
        return res.status(400).send('Resource not found - Delete failed');
      } else {
        return next();
      }
    })
    .catch((err) => {
      return next({
        log: 'ERROR in userControllers.removeFavResource',
        message: { err: `ERROR in userControllers.removeFavResource ${err}` },
      });
    });
};

module.exports = userController;
