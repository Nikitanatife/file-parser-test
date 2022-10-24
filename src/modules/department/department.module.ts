import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DepartmentEntity } from './department.entity';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService],
  imports: [
    MikroOrmModule.forFeature({
      entities: [DepartmentEntity],
    }),
  ],
  exports: [DepartmentService],
})
export class DepartmentModule {}
