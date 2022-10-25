import { Controller, Get, HttpCode } from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly _departmentService: DepartmentService) {}

  // відобразити відділи в порядку зменшення різниці між максимальною та мінімальною середньорічною зарплатою,
  // на кожен відділ до 3 працівників з найбільшим приростом зарплати за рік (у відсотках) та розміром останньої зарплати
  @Get('/stats')
  @HttpCode(200)
  async getDepartmentsWithTopEmployees() {
    return this._departmentService.getDepartmentsWithTopEmployees();
  }
}
