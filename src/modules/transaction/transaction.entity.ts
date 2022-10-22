import { Entity, Enum, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../entities/base.entity';

@Entity({
  tableName: 'transaction',
})
export class TransactionEntity extends BaseEntity {
  @Property({ columnType: 'date' })
  date: Date;

  @Property()
  amount: number;

  @Property({ default: 'USD' })
  currency: string;

  @Enum(() => TransactionTypes)
  type: TransactionTypes;

  @Property()
  localId: number;
}

export enum TransactionTypes {
  SALARY = 'salary',
  DONATION = 'donation',
}
