import { IsNumber, IsNotEmpty, IsAlpha } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @IsNotEmpty()
  @IsAlpha()
  surname: string;
}
