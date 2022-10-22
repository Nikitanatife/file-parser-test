import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

@Entity({ abstract: true })
export class PersonEntity extends BaseEntity {
  @Property()
  name: string;

  @Property()
  surname: string;
}
