const Employee = require('@domain/employee');
const pg = require('@database/db');

const fullName: string = process.argv[3];
const birthDate: string = process.argv[4];
const sex: string = process.argv[5];

module.exports = function () {
  const newEmployee: typeof Employee = new Employee(fullName, birthDate, sex);
  console.log('In process... Please, wait.');
  newEmployee.sendToDB(async function (employee: typeof Employee) {
    const res = await pg.query(
      `INSERT INTO employee (full_name, birth_date, sex) values ($1, ($2)::date, $3) RETURNING *;`,
      [employee.fullName, employee.birthDate, employee.sex]
    );
    pg.end();
    console.log('Object was succesfully inserted.\n', res.rows[0]);
  });
};
