import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TransactionEntity } from './transaction.entity';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [MikroOrmModule.forFeature({ entities: [TransactionEntity] })],
  exports: [TransactionService],
})
export class TransactionModule {}
