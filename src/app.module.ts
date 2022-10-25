import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EmployeeModule } from './modules/employee';
import { DepartmentModule } from './modules/department';
import { TransactionModule } from './modules/transaction';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    EmployeeModule,
    DepartmentModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
