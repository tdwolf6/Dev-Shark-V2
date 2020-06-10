const db = require('./../db/db');

const userController = {};

let item = '';
// verifyUser should check if user exists in database / is valid
userController.verifyUser = (req, res, next) => {
  const { email, password } = req.body;
  console.log(typeof email, typeof password);
  console.log('email and password are', email, password);
  item =
    'SELECT u.users_id, u.email FROM users u WHERE email = $1 AND password = $2;';
  const values = [email, password];
  console.log('Right before query');
  db.query(item, values)
    .then((query) => {
      console.log('Inside then');
      console.log('In verifyuser query.rows is', query.rows);
      if (!query.rows.length) {
        return res.status(400).send('Login Failed');
      }
      res.locals.currentUser = query.rows[0];
      return next();
    })
    .catch((err) => {
      console.log('Inside catch');
      return next({
        log: 'ERROR in userControllers.verifyUser',
        message: { err: `ERROR in userControllers.verifyUser ${err}` },
      });
    });
};

// getFavTechs checks for favorite tech topics to render in left navbar for current logged in user
userController.getFavTechs = (req, res, next) => {
  const userId = res.locals.currentUser.users_id;
  item = `SELECT t.tech FROM users u INNER JOIN favorite_techs ft ON u.users_id = ft.users_id INNER JOIN techs t ON ft.techs_id = t.techs_id WHERE u.users_id = $1;`;
  const values = [userId];
  db.query(item, values)
    .then((query) => {
      console.log('In getFavTechs query.rows is', query.rows);
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
  const userId = res.locals.currentUser.users_id;
  item = `SELECT r.* FROM users u INNER JOIN favorite_resources fr ON u.users_id = fr.users_id INNER JOIN resources r ON fr.resources_id = r.resources_id WHERE u.users_id = $1;`;
  const values = [userId];
  db.query(item, values)
    .then((query) => {
      console.log('In getFavResources query.rows is', query.rows);
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
// add middleware to userController -> userController.addUser = (req,res,next) etc...

module.exports = userController;
