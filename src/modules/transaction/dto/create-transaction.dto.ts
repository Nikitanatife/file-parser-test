import { IsNumber, IsNotEmpty, IsAlpha, IsDate, IsEnum } from 'class-validator';
import { TransactionTypes } from '../transaction.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsAlpha()
  currency: string;

  @IsNotEmpty()
  @IsEnum(TransactionTypes)
  type: TransactionTypes;

  @IsNotEmpty()
  @IsNumber()
  employee: number;
}
