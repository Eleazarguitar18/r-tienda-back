import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AgentesService } from './agentes.service';
import { CrearTransaccionAgenteDto } from './dto/crear-transaccion-agente.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('agentes')
@Controller('agentes')
export class AgentesController {
  constructor(private readonly agentesService: AgentesService) { }

  @Post()
  @ApiOperation({ summary: 'Registrar una transacción de agente' })
  create(@Body() crearTransaccionAgenteDto: CrearTransaccionAgenteDto) {
    return this.agentesService.create(crearTransaccionAgenteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las transacciones de agentes' })
  findAll() {
    return this.agentesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una transacción de agente por ID' })
  findOne(@Param('id') id: string) {
    return this.agentesService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una transacción de agente' })
  remove(@Param('id') id: string) {
    return this.agentesService.remove(+id);
  }
}
