const db = require('../db/db');

const voteController = {};

let item = '';
voteController.updateUpvote = (req, res, next) => {
  // make a query to see if this user id has already upvoted this resource
  // users_id in res.locals.users_id
  const { users_id } = res.locals;
  // resources_id is in req.body.resources_id
  const { resources_id } = req.body;
  // does this resource id linked to user id exist in upvotes table?
  item = `SELECT * FROM upvote WHERE users_id = $1 AND resources_id = $2`;
  const values = [users_id, resources_id];
  db.query(item, values)
    .then((query) => {
      if (!query.rows.length) {
        // if yes, set res.locals.vote to { upvote: cancel }
        // if no, set res.locals.vote to { upvote: confirm }
        res.locals.vote = { upvote: 'confirm' };
        return next();
      } else {
        res.locals.vote = { upvote: 'cancel' };
        item = `DELETE FROM upvote WHERE users_id = $1 AND resources_id = $2`;
        db.query(item, values)
          .then((query) => {
            return next();
          })
          .catch((err) => {
            return next({
              log: 'ERROR in voteController.updateUpvote',
              message: { err: `ERROR in voteController.updateUpvote ${err}` },
            });
          });
      }
    })
    .catch((err) =>
      next({
        log: 'ERROR in voteController.updateUpvote',
        message: { err: `ERROR in voteController.updateUpvote ${err}` },
      })
    );
  // if cancel, delete that entry inside upvote table
  // if confirm, insert entry inside upvote table
};

voteController.updateDownvote = (req, res, next) => {
  return next();
};

module.exports = voteController;
