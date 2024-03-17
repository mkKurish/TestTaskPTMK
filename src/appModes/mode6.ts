const pg = require('@database/db');

module.exports = async function () {
  console.log('Optimization is starting. Please wait.');
  await pg.query(`VACUUM employee;`);
  await pg.query(`ANALYZE employee;`);
  await pg.query(`CREATE EXTENSION pg_trgm;`);
  await pg.query(
    `CREATE INDEX idx_full_name ON employee USING gin (full_name gin_trgm_ops);`
  );
  pg.end();
  console.log('The database is optimized.');
};
