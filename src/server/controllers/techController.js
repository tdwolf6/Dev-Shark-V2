const db = require('./../db/db');

const techController = {};

let item = '';
techController.addTech = (req, res, next) => {
  console.log('Inside addTech');
  const { tech } = req.body;
  item = `INSERT INTO techs (tech) VALUES ($1);`;
  const values = [tech];
  db.query(item, values)
    .then((query) => {
      res.locals.newTech = query.rows;
      console.log('Query.rows in addTech: ', query.rows);
      return next();
    })
    .catch((err) => {
      return next({
        log: 'ERROR in techController.addTech',
        message: { err: `ERROR in techController.addTech ${err}` },
      });
    });
};

module.exports = techController;
