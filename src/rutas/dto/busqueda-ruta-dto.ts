import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BusquedaRutaDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  latOrigen: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  lonOrigen: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  latDestino: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  lonDestino: number;
}
