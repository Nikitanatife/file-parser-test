import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../entities/base.entity';

@Entity({
  tableName: 'department',
})
export class DepartmentEntity extends BaseEntity {
  @Property()
  name: string;
}
