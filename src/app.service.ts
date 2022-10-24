import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as yaml from 'js-yaml';
import { DepartmentService } from './modules/department';
import { FileInterface, ITransaction } from './interfaces/file.interface';
// import * as fs from 'fs/promises';
// import * as path from 'path';
import * as crypto from 'crypto';
import { EmployeeService } from './modules/employee';
import { TransactionService } from './modules/transaction/transaction.service';
import { TransactionTypes } from './modules/transaction/transaction.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly _departmentService: DepartmentService,
    private readonly _employeeService: EmployeeService,
    private readonly _transactionService: TransactionService,
  ) {}
  async processUploadedFile(file: Express.Multer.File) {
    try {
      const employees = [];
      let transactions = [];
      const data = file.buffer.toString();
      // const outputPath = path.join(__dirname, '../', 'temp', 'output');

      const dataYaml = await this.convertTextToYaml(data);
      const dataJs = yaml.load(dataYaml) as FileInterface;

      const departmentsData = dataJs.e_list.map(
        ({
          employee: {
            department: { name, id: localId },
          },
        }) => this._departmentService.create({ name, localId, id: localId }),
      );
      const departments = await Promise.all(departmentsData);

      dataJs.e_list.forEach(
        ({
          employee: {
            id: employeeLocalId,
            name: employeeName,
            surname,
            department: { id: departmentLocalId },
            salary,
            ...donationsData
          },
        }) => {
          const department = departments.find(
            (d) => d.localId === departmentLocalId,
          );

          const employee = this._employeeService.create({
            name: employeeName,
            surname,
            department: department.id,
            localId: employeeLocalId,
          });
          employees.push(employee);

          const salaries = salary.map(
            ({ statement: { id: localId, date, amount } }) =>
              this._transactionService.create({
                amount,
                date: new Date(date),
                localId,
                employee: employee.id,
                type: TransactionTypes.SALARY,
                currency: 'USD',
              }),
          );
          // console.log(salaries);
          transactions = transactions.concat(salaries);
          const donations = [];

          for (const [key, value] of Object.entries(donationsData)) {
            if (key.includes('donation') && value) {
              const donation = value as ITransaction<string>;
              const {
                id: donationLocalId,
                date: donationDate,
                amount: donationAmountData = '',
              } = donation;
              const [donationAmount = 0, donationCurrency = 'USD'] =
                donationAmountData.split(' ');
              donations.push(
                this._transactionService.create({
                  localId: donationLocalId,
                  type: TransactionTypes.DONATION,
                  currency: donationCurrency,
                  date: new Date(donationDate),
                  amount: Number(donationAmount),
                  employee: employee.id,
                }),
              );
            }
          }
          transactions = transactions.concat(donations);
        },
      );

      // console.log(employees);
      // console.log(departments);
      // console.log(transactions);
      await this._departmentService.write(departments);
      // await this._employeeService.write(employees);
      // await this._transactionService.write(transactions);
      // TODO - write error

      return dataJs;
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  private async convertTextToYaml(
    data: string,
    // outputPath: string,
  ): Promise<string> {
    const result = data
      .replace('E-List', 'e_list:')
      .replace(/^\s{2}Employee.*$/gm, '- employee:')
      .replace(/Department/gm, 'department:')
      .replace(/Salary/gm, 'salary:')
      .replace(/^\s{6}Statement.*$/gm, '    - statement:')
      // .replace(/^\s{4}Donation.*$/gm, `    donation${uuid()}:`)
      // .replace(/donation:\n\s\s\s\s\s\sid:/g, 'donation:\n        id:')
      // .replace(/\s{6}date:/g, '        date:')
      // .replace(/\s{6}amount:/g, '        amount:')
      .replace('Rates', 'rates:')
      .replace(/^\s{2}Rate.*$/gm, '- rate:')
      .split(/(Donation)/g)
      .map((item) =>
        item === 'Donation'
          ? `donation${crypto.randomBytes(12).toString('hex')}:`
          : item,
      )
      .join('');

    // await fs.writeFile(outputPath, result);
    return result;
  }
}
