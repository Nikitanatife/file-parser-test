import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../entities/base.entity';
import { EmployeeEntity } from '../employee';

@Entity({
  tableName: 'transaction',
})
export class TransactionEntity extends BaseEntity {
  @Property({ columnType: 'date' })
  date: Date;

  @Property()
  amount: number;

  @Property({ default: 'USD', nullable: true })
  currency?: string;

  @Enum(() => TransactionTypes)
  type: TransactionTypes;

  @Property()
  localId: number;

  @ManyToOne()
  employee: EmployeeEntity;
}

export enum TransactionTypes {
  SALARY = 'salary',
  DONATION = 'donation',
}
