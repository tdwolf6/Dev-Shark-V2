const db = require('../db/db');

const voteController = {};

let item = '';
// Increase the like count of a resource by one
voteController.addLike = (req, res, next) => {
  const resources_id = req.body.id;
  console.log('This is your resource id     ', resources_id);
  // Increase like count by 1 for a resource(_id)
  item = `UPDATE resources SET likes = likes + 1 WHERE _id = $1`;
  const values = [resources_id];
  db.query(item, values)
    .then(() => {
      return next();
    })
    .catch((err) =>
      next({
        log: 'ERROR in resourceControllers.addLike',
        message: { err: `ERROR in addLike ${err}` },
      })
    );
};

// Decrease the like count of a resource by one
voteController.subtractLike = (req, res, next) => {
  let resources_id = req.body.id;
  // Decrease like count by 1 for a resource(id) if the likes > 0
  item = `UPDATE resources SET likes = likes - 1 WHERE _id = $1 and likes > 0`;
  const values = [resources_id];
  db.query(item, values)
    .then(() => {
      return next();
    })
    .catch((err) =>
      next({
        log: 'ERROR in resourceControllers.subtractLike',
        message: { err: `ERROR in subtractLike ${err}` },
      })
    );
};

module.exports = voteController;
