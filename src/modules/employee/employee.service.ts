import { Injectable } from '@nestjs/common';
import { EmployeeEntity } from './employee.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CreateEmployeeDto } from './dto';
import { GET_EMPLOYEES_DONATED_MOST } from './queries';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly _employeeRepository: EntityRepository<EmployeeEntity>,
    private readonly _orm: MikroORM,
  ) {}

  create(body: CreateEmployeeDto): EmployeeEntity {
    return this._employeeRepository.create(body);
  }

  async write(entities: EmployeeEntity[]): Promise<void> {
    return this._employeeRepository
      .createQueryBuilder('e')
      .insert(entities)
      .onConflict('id')
      .ignore()
      .execute();
  }

  async getEmployeesDonatedMost() {
    const connection = this._orm.em.getConnection();

    return connection.execute(GET_EMPLOYEES_DONATED_MOST);
  }
}
