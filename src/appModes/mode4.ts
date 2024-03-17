const Employee = require('@domain/employee');
const pg = require('@database/db');
const namesMale = require('@domain/namesMale.json');
const namesFemale = require('@domain/namesFemale.json');
const surnames = require('@domain/surnames.json');

const randomInt = function (min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const twoPadStyle = function (num: number) {
  return String(num).padStart(2, '0');
};

const generateFullName = function (sex: string) {
  const firstName =
    sex == 'Male'
      ? namesMale[randomInt(0, namesMale.length - 1)]
      : namesFemale[randomInt(0, namesFemale.length - 1)];
  const secondName = namesMale[randomInt(0, namesMale.length - 1)];
  const surname = surnames[randomInt(0, surnames.length - 1)];
  return `${surname} ${firstName} ${secondName}`;
};

const generateBirthDate = function () {
  const year = randomInt(1900, 2023);
  const month = randomInt(1, 12);
  let maxDays;
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      maxDays = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      maxDays = 30;
      break;
    default:
      if (year % 4 == 0) maxDays = 29;
      else maxDays = 28;
      break;
  }
  const day = randomInt(1, maxDays);
  return `${year}-${twoPadStyle(month)}-${twoPadStyle(day)}`;
};

const generateSex = function () {
  return Math.floor(Math.random() * 2) == 1 ? 'Male' : 'Female';
};

const generateEmployee = function (sex: string | undefined = undefined) {
  !sex && (sex = generateSex());
  const fullname = generateFullName(sex);
  const birthDate = generateBirthDate();
  return new Employee(fullname, birthDate, sex);
};

// Use the comment lines to check
// the normal distribution of random values.
module.exports = function () {
  //   const sMap = new Map();
  const employees = [];
  for (let i = 0; i < 1000000; i++) {
    employees.push(generateEmployee());
    /*
    sMap.set(
      emp.fullName.at(0),
      1 + (sMap.has(emp.fullName.at(0)) ? sMap.get(emp.fullName.at(0)) : 0)
    );
    */
  }
  for (let i = 0; i < 100; i++) {
    const emp = generateEmployee('Male');
    emp.fullName = 'F' + emp.fullName.slice(1);
    employees.push(emp);
    /*
    sMap.set(
      emp.fullName.at(0),
      1 + (sMap.has(emp.fullName.at(0)) ? sMap.get(emp.fullName.at(0)) : 0)
    );
    */
  }
  //   console.log(sMap);
  console.log('Ready to call send. Please wait.');
  Employee.sendPackageToDB(
    async function (packageBlock: string, employeeArgs: Array<String>) {
      const res = await pg.query(
        `INSERT INTO employee (full_name, birth_date, sex) values ${packageBlock};`,
        employeeArgs
      );
    },
    employees,
    () => {
      pg.end();
      console.log('Successfully done.');
    }
  );
};
