import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCajaDto } from './create-caja.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateCajaDto extends PartialType(CreateCajaDto) {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  id_user_update?: number;
}
