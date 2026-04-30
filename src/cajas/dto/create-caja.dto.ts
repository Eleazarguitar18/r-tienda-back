import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn, MinLength, IsInt, IsOptional } from 'class-validator';

export class CreateCajaDto {
  @ApiProperty({ example: 'Caja 01 - General' })
  @IsString()
  @MinLength(3)
  nombre: string;

  @ApiProperty({
    example: 'MIXTA',
    enum: ['SOLO_VENTAS', 'SOLO_AGENTES', 'MIXTA'],
  })
  @IsString()
  @IsIn(['SOLO_VENTAS', 'SOLO_AGENTES', 'MIXTA'])
  especialidad: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  id_user_create?: number;
}
