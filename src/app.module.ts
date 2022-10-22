import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EmployeeModule } from './modules/employee';
import { DepartmentModule } from './modules/department';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    EmployeeModule,
    DepartmentModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
