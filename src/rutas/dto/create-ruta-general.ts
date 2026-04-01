import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateLineaDto } from 'src/lineas/dto/create-linea.dto';
import { CreateRutaDto } from './create-ruta.dto';
import { CreatePuntoDto } from 'src/puntos/dto/create-punto.dto';

export class CreateRutaGeneralDto {
  @ApiProperty({ type: CreateLineaDto })
  @IsNotEmpty()
  linea: CreateLineaDto;
  @ApiProperty({ type: CreateLineaDto })
  @IsNotEmpty()
  ruta: CreateRutaDto;
  @ApiProperty({ type: CreatePuntoDto, isArray: true })
  @IsNotEmpty()
  puntos: CreatePuntoDto[];
}
export class UpdateRutaGeneralDto extends PartialType(CreateRutaGeneralDto) {}
