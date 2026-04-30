import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CajasService } from './cajas.service';
import { AbrirCajaDto } from './dto/abrir-caja.dto';
import { CerrarCajaDto } from './dto/cerrar-caja.dto';
import { CrearMovimientoDto } from './dto/crear-movimiento.dto';
import { CreateCajaDto } from './dto/create-caja.dto';
import { UpdateCajaDto } from './dto/update-caja.dto';

@Controller('cajas')
export class CajasController {
  constructor(private readonly cajasService: CajasService) {}

  @Get()
  findAllCajas() {
    return this.cajasService.findAllCajas();
  }

  @Post()
  createCaja(@Body() createCajaDto: CreateCajaDto) {
    return this.cajasService.create(createCajaDto);
  }

  @Get(':id')
  findCaja(@Param('id') id: string) {
    return this.cajasService.findCaja(+id);
  }

  @Patch(':id')
  updateCaja(@Param('id') id: string, @Body() updateCajaDto: UpdateCajaDto) {
    return this.cajasService.update(+id, updateCajaDto);
  }

  @Delete(':id')
  removeCaja(@Param('id') id: string, @Query('id_user_update') id_user_update: string) {
    return this.cajasService.softDeleteCaja(+id, +id_user_update);
  }

  @Post('abrir')
  abrirCaja(@Body() abrirCajaDto: AbrirCajaDto) {
    return this.cajasService.abrirCaja(abrirCajaDto);
  }

  @Patch('sesion/:id/cerrar')
  cerrarCaja(@Param('id') id: string, @Body() cerrarCajaDto: CerrarCajaDto) {
    return this.cajasService.cerrarCaja(+id, cerrarCajaDto);
  }

  @Post('movimiento')
  crearMovimiento(@Body() crearMovimientoDto: CrearMovimientoDto) {
    return this.cajasService.crearMovimiento(crearMovimientoDto);
  }
}
