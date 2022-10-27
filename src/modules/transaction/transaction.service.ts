import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { TransactionEntity } from './transaction.entity';
import { CreateTransactionDto } from './dto';
import { MikroORM } from '@mikro-orm/core';
import { GET_DONATIONS } from './queries/getDonations';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly _transactionRepository: EntityRepository<TransactionEntity>,
    private readonly _orm: MikroORM,
  ) {}

  create(body: CreateTransactionDto): TransactionEntity {
    return this._transactionRepository.create(body);
  }

  async write(entities: TransactionEntity[]): Promise<void> {
    return this._transactionRepository
      .createQueryBuilder('t')
      .insert(entities)
      .onConflict('id')
      .ignore()
      .execute();
  }

  async getDonations() {
    const connection = this._orm.em.getConnection();

    return connection.execute(GET_DONATIONS);
  }
}
