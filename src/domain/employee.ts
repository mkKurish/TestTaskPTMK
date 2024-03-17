class Employee {
  fullName: string;
  birthDate: string;
  sex: string;

  constructor(fullName: string, birthDate: string, sex: string) {
    this.fullName = fullName;
    this.birthDate = birthDate;
    this.sex = sex;
  }

  sendToDB(sendFunc: Function) {
    sendFunc(this);
  }
  static async sendPackageToDB(
    sendFunc: Function,
    employees: Array<Employee>,
    callback: Function
  ) {
    let indices: number = 0;
    const limit: number = 65535 - 3;
    let employeeArgs: Array<string> = [];
    let packageBlock: string = '';
    for (let employee of employees) {
      if (indices >= limit) {
        await sendFunc(
          packageBlock.slice(0, packageBlock.length - 1),
          employeeArgs
        );
        indices = 0;
        employeeArgs = [];
        packageBlock = '';
      }
      packageBlock += `($${++indices}, ($${++indices})::date, $${++indices}),`;
      Object.values(employee).forEach((value) => {
        employeeArgs.push(value);
      });
    }
    if (employeeArgs.length != 0)
      await sendFunc(
        packageBlock.slice(0, packageBlock.length - 1),
        employeeArgs
      );
    callback();
  }
  getCurrentAge() {
    const currDate = new Date();
    const dateOfBirth = new Date(this.birthDate);
    let ages = currDate.getFullYear() - dateOfBirth.getFullYear();
    const months = currDate.getMonth() - dateOfBirth.getMonth();
    const days = currDate.getDate() - dateOfBirth.getDate();
    if (months < 0 || (months == 0 && days < 0)) ages--;
    return ages;
  }
}

module.exports = Employee;
