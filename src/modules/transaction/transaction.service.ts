import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { TransactionEntity } from './transaction.entity';
import { CreateTransactionDto } from './dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly _transactionRepository: EntityRepository<TransactionEntity>,
  ) {}

  create(body: CreateTransactionDto): TransactionEntity {
    return this._transactionRepository.create(body);
  }

  async write(entities: TransactionEntity[]): Promise<void> {
    return this._transactionRepository.persistAndFlush(entities);
  }
}
