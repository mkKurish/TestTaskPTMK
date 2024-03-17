const execSync = require('child_process').execSync;
const commands = require('@database/createDB.sh').split('\n');

module.exports = function (user: string, dbName: string) {
  execSync(`${commands[0]} ${user} ${commands[1]} ${dbName} ${commands[2]}`);
};
