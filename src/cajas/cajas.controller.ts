import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CajasService } from './cajas.service';
import { AbrirCajaDto } from './dto/abrir-caja.dto';
import { CerrarCajaDto } from './dto/cerrar-caja.dto';
import { CrearMovimientoDto } from './dto/crear-movimiento.dto';
import { CreateCajaDto } from './dto/create-caja.dto';
import { UpdateCajaDto } from './dto/update-caja.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('cajas')
@Controller('cajas')
export class CajasController {
  constructor(private readonly cajasService: CajasService) { }

  @Get()
  @ApiOperation({ summary: 'Listar todas las cajas' })
  findAllCajas() {
    return this.cajasService.findAllCajas();
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva caja' })
  createCaja(@Body() createCajaDto: CreateCajaDto) {
    return this.cajasService.create(createCajaDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una caja por ID' })
  findCaja(@Param('id') id: string) {
    return this.cajasService.findCaja(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar datos de una caja' })
  updateCaja(@Param('id') id: string, @Body() updateCajaDto: UpdateCajaDto) {
    return this.cajasService.update(+id, updateCajaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) una caja' })
  @ApiQuery({ name: 'id_user_update', required: true, description: 'ID del usuario que realiza la eliminación' })
  removeCaja(@Param('id') id: string, @Query('id_user_update') id_user_update: string) {
    return this.cajasService.softDeleteCaja(+id, +id_user_update);
  }

  @Post('abrir')
  @ApiOperation({ summary: 'Abrir una sesión de caja' })
  abrirCaja(@Body() abrirCajaDto: AbrirCajaDto) {
    return this.cajasService.abrirCaja(abrirCajaDto);
  }

  @Patch('sesion/:id/cerrar')
  @ApiOperation({ summary: 'Cerrar una sesión de caja activa' })
  cerrarCaja(@Param('id') id: string, @Body() cerrarCajaDto: CerrarCajaDto) {
    return this.cajasService.cerrarCaja(+id, cerrarCajaDto);
  }

  @Post('movimiento')
  @ApiOperation({ summary: 'Registrar un movimiento de caja (ingreso/egreso)' })
  crearMovimiento(@Body() crearMovimientoDto: CrearMovimientoDto) {
    return this.cajasService.crearMovimiento(crearMovimientoDto);
  }
}
