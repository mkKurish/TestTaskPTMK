const Employee = require('@domain/employee');
const pg = require('@database/db');

module.exports = async function () {
  const rawEmployees = await pg.query(
    `SELECT DISTINCT ON(full_name, birth_date) full_name, birth_date, sex FROM employee ORDER BY full_name;`
  );
  pg.end();
  console.log('RESULT:');
  for (let rawEmployee of rawEmployees.rows) {
    const employee: typeof Employee = new Employee(
      ...Object.values(rawEmployee)
    );
    console.log(
      employee.fullName,
      employee.birthDate,
      employee.sex,
      employee.getCurrentAge()
    );
  }
};
