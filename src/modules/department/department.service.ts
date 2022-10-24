import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { DepartmentEntity } from './department.entity';
import { CreateDepartmentDto } from './dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly _departmentRepository: EntityRepository<DepartmentEntity>,
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
}
