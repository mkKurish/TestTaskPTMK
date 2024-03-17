const pg = require('@database/db');
const createQuery = require('@database/createTable.sql');

module.exports = function () {
  console.log('In process... Please, wait.');
  pg.query(createQuery);
  pg.end();
  console.log('Successfully done.');
};
