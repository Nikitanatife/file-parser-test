import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { DepartmentEntity } from './department.entity';
import { CreateDepartmentDto } from './dto';
import { MikroORM } from '@mikro-orm/core';
import { GET_DEPARTMENTS_WITH_TOP_EMPLOYEES } from './queries/get-departments-with-top-employees';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly _departmentRepository: EntityRepository<DepartmentEntity>,
    private readonly _orm: MikroORM,
  ) {}

  create(body: CreateDepartmentDto): DepartmentEntity {
    return this._departmentRepository.create(body);
  }

  async write(entities: DepartmentEntity[]): Promise<void> {
    return this._departmentRepository
      .createQueryBuilder('d')
      .insert(entities)
      .onConflict('id')
      .ignore()
      .execute();
  }

  async getDepartmentsWithTopEmployees() {
    const connection = this._orm.em.getConnection();

    return connection.execute(GET_DEPARTMENTS_WITH_TOP_EMPLOYEES);
  }
}
