import { PersonEntity } from '../../entities/person.entity';
import { Entity } from '@mikro-orm/core';

@Entity({
  tableName: 'employee',
})
export class EmployeeEntity extends PersonEntity {}
