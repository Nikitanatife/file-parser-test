import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EmployeeEntity } from './employee.entity';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [
    MikroOrmModule.forFeature({
      entities: [EmployeeEntity],
    }),
  ],
  exports: [EmployeeService],
})
export class EmployeeModule {}
