import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CrearVentaDto } from './dto/crear-venta.dto';
import { ActualizarVentaDto } from './dto/actualizar-venta.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('ventas')
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) { }

  @Post()
  @ApiOperation({ summary: 'Registrar una nueva venta' })
  create(@Body() crearVentaDto: CrearVentaDto) {
    return this.ventasService.create(crearVentaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ventas' })
  findAll() {
    return this.ventasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una venta por ID' })
  findOne(@Param('id') id: string) {
    return this.ventasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar o anular una venta' })
  update(@Param('id') id: string, @Body() actualizarVentaDto: ActualizarVentaDto) {
    return this.ventasService.update(+id, actualizarVentaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una venta por ID' })
  remove(@Param('id') id: string) {
    return this.ventasService.remove(+id);
  }
}
