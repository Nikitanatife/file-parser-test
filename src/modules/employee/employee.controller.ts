import { Controller, Get, HttpCode } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly _employeeService: EmployeeService) {}

  // знайти працівників, які відправили на благодійність більше 10% своєї середньої місячної зарплати за останні 6 місяців
  // та відсортувати за мінімальною середньорічною зарплатою
  @Get('/donations')
  @HttpCode(200)
  async getEmployeesDonatedMost() {
    return this._employeeService.getEmployeesDonatedMost();
  }
}
