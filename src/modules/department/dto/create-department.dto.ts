import { IsNumber, IsNotEmpty, IsAlpha } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsAlpha()
  name: string;
}
