const db = require('./../db/db');

const favoritesController = {};

// getFavTechs checks for favorite tech topics to render in left navbar for current logged in user
favoritesController.getFavTechs = (req, res, next) => {
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
favoritesController.getFavIds = (req, res, next) => {
  const { users_id } = res.locals.currentUser || res.locals;
  console.log('favoritesController.getFavIds -> users_id', users_id);
  item = `SELECT r.resources_id FROM users u INNER JOIN favorite_resources fr ON u.users_id = fr.users_id INNER JOIN resources r ON fr.resources_id = r.resources_id WHERE u.users_id = $1;`;
  const values = [users_id];
  db.query(item, values)
    .then((query) => {
      res.locals.favIds = query.rows.map((obj) => obj.resources_id);
      return next();
    })
    .catch((err) =>
      next({
        log: 'ERROR in userControllers.getFavIds',
        message: { err: `ERROR in userControllers.getFavIds ${err}` },
      })
    );
};

favoritesController.getFavResources = (req, res, next) => {
  const { users_id } = res.locals;
  console.log('favoritesController.getFavResources -> users_id', users_id);
  item = `SELECT r.resources_id, r.name, r.description, r.url, r.likes, r.tech_id, t.tech 
  FROM users u INNER JOIN favorite_resources fr ON u.users_id = fr.users_id 
  INNER JOIN resources r ON fr.resources_id = r.resources_id 
  INNER JOIN techs t ON r.tech_id = t.techs_id
  WHERE u.users_id = $1;`;
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
favoritesController.checkFavResource = (req, res, next) => {
  const { users_id } = res.locals;
  const { resources_id } = req.body;
  item = `SELECT * FROM favorite_resources WHERE users_id = $1 AND resources_id = $2;`;
  const values = [users_id, resources_id];
  db.query(item, values)
    .then((query) => {
      if (!query.rows[0]) {
        console.log('successful check fav resource');
        return next();
      } else {
        console.log('FAIL inside check fav resource');
        return res.status(400).send('Resource is already favorited!');
      }
    })
    .catch((err) => {
      console.log('FAIL inside check fav resource');
      return next({
        log: 'ERROR in userControllers.checkFavResource',
        message: { err: `ERROR in userControllers.checkFavResource ${err}` },
      });
    });
};

// adds favorite resource
favoritesController.addFavResource = (req, res, next) => {
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
favoritesController.removeFavResource = (req, res, next) => {
  const { users_id } = res.locals;
  const { resources_id } = req.body;
  item = `DELETE FROM favorite_resources WHERE users_id = $1 AND resources_id = $2 RETURNING resources_id;`;
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

module.exports = favoritesController;
