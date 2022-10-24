import { PersonEntity } from '../../entities/person.entity';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { DepartmentEntity } from '../department';

@Entity({
  tableName: 'employee',
})
export class EmployeeEntity extends PersonEntity {
  @ManyToOne()
  department: DepartmentEntity;
}
