import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IOrder } from 'modules/database/interfaces/order';

export class SaveOrderValidator implements IOrder {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public description: string;
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public quantity: number;
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public value: number;
}
