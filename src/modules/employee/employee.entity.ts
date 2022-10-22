import { PersonEntity } from '../../entities/person.entity';
import { Entity, Property } from '@mikro-orm/core';
// import { DepartmentEntity } from '../department';

@Entity({
  tableName: 'employee',
})
export class EmployeeEntity extends PersonEntity {
  @Property()
  localId: number;
}
