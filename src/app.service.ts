import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as yaml from 'js-yaml';
import { DepartmentService } from './modules/department';
import { FileInterface, ITransaction } from './interfaces/file.interface';
import * as crypto from 'crypto';
import { EmployeeService } from './modules/employee';
import { TransactionService } from './modules/transaction';
import { TransactionTypes } from './modules/transaction';

@Injectable()
export class AppService {
  constructor(
    private readonly _departmentService: DepartmentService,
    private readonly _employeeService: EmployeeService,
    private readonly _transactionService: TransactionService,
  ) {}
  async processUploadedFile(file: Express.Multer.File) {
    try {
      const employees = [],
        departments = [];
      let transactions = [];
      const data = file.buffer.toString();

      const dataYaml = await this.convertTextToYaml(data);
      const dataJs = yaml.load(dataYaml) as FileInterface;

      dataJs.e_list.forEach(
        ({
          employee: {
            id: employeeId,
            name: employeeName,
            surname,
            department: { id: departmentId, name: departmentName },
            salary,
            ...donationsData
          },
        }) => {
          const department = this._departmentService.create({
            name: departmentName,
            id: departmentId,
          });
          departments.push(department);

          const employee = this._employeeService.create({
            name: employeeName,
            surname,
            department: department.id,
            id: employeeId,
          });
          employees.push(employee);

          const salaries = salary.map(({ statement: { id, date, amount } }) =>
            this._transactionService.create({
              amount,
              date: new Date(date),
              id,
              employee: employee.id,
              type: TransactionTypes.SALARY,
              currency: 'USD',
            }),
          );

          transactions = transactions.concat(salaries);
          const donations = [];

          for (const [key, value] of Object.entries(donationsData)) {
            if (key.includes('donation') && value) {
              const donation = value as ITransaction<string>;
              const {
                id: donationId,
                date: donationDate,
                amount: donationAmountData = '',
              } = donation;
              let [donationAmount = 0, donationCurrency = 'USD'] =
                donationAmountData.split(' ');

              const rate = dataJs.rates?.find(
                ({ rate: { date, sign } }) =>
                  date === donationDate && donationCurrency === sign,
              );

              if (rate) {
                donationAmount = Number(donationAmount) * rate.rate.value;
                donationCurrency = 'USD';
              }

              donations.push(
                this._transactionService.create({
                  id: donationId,
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

      await this._departmentService.write(departments);
      await this._employeeService.write(employees);
      await this._transactionService.write(transactions);

      return dataJs;
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  private async convertTextToYaml(data: string): Promise<string> {
    return data
      .replace('E-List', 'e_list:')
      .replace(/^\s{2}Employee.*$/gm, '- employee:')
      .replace(/Department/gm, 'department:')
      .replace(/Salary/gm, 'salary:')
      .replace(/^\s{6}Statement.*$/gm, '    - statement:')
      .replace('Rates', 'rates:')
      .replace(/^\s{2}Rate.*$/gm, '- rate:')
      .split(/(Donation)/g)
      .map((item) =>
        item === 'Donation'
          ? `donation${crypto.randomBytes(12).toString('hex')}:`
          : item,
      )
      .join('');
  }
}
