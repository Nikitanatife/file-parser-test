import { Injectable } from '@nestjs/common';
import { EmployeeEntity } from './employee.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
// import { CreateEmployeeDto } from './dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly _transactionRepository: EntityRepository<EmployeeEntity>,
  ) {}

  // async create(body: CreateEmployeeDto) {}
}
