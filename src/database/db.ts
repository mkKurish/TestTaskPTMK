const prompt = require('prompt-sync')({ sigint: true });
const Pool = require('pg').Pool;
const createDB = require('./dbInit');
const types = require('pg').types;

types.setTypeParser(1082, (str: string) => str.toString());

const user = prompt('Your psql username: ');
const dbName = prompt('Set DB name: ');

if (process.argv[2] == '1') createDB(user, dbName);

const password = prompt(
  `Enter ${user}'s password${process.argv[2] == '1' ? ' again' : ''}: `
);

module.exports = new Pool({
  user: user,
  password: password,
  host: 'localhost',
  port: 5432,
  database: dbName
});
