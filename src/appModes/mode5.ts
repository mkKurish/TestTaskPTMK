const Employee = require('@domain/employee');
const pg = require('@database/db');

module.exports = async function () {
  performance.mark('pg query');
  const rawEmployees = await pg.query(
    `SELECT full_name, birth_date, sex FROM employee WHERE sex = 'Male' AND full_name LIKE 'F%';`
  );
  pg.end();
  performance.measure('measure query execution', 'pg query');
  console.log('RESULT:');
  for (let rawEmployee of rawEmployees.rows) {
    const employee = new Employee(...Object.values(rawEmployee));
    console.log(
      employee.fullName,
      employee.birthDate,
      employee.sex,
      employee.getCurrentAge()
    );
  }
  const takenTime = performance.getEntriesByName('measure query execution')[0]
    .duration;
  console.log(
    'It took ',
    +takenTime.toFixed(2),
    ' ms (without console output)'
  );
};
