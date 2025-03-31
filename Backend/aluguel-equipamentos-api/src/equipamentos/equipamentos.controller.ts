import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { EquipamentosService } from './equipamentos.service';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto';
import { UpdateEquipamentoDto } from './dto/update-equipamento.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('equipamentos')
@Controller('equipamentos')
export class EquipamentosController {
  constructor(private readonly equipamentosService: EquipamentosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo equipamento' })
  @ApiResponse({ status: 201, description: 'Equipamento criado com sucesso.' })
  create(@Body() createEquipamentoDto: CreateEquipamentoDto) {
    return this.equipamentosService.create(createEquipamentoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os equipamentos' })
  @ApiResponse({ status: 200, description: 'Lista de equipamentos retornada com sucesso.' })
  findAll(@Query('search') search?: string) {
    return this.equipamentosService.findAll(search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um equipamento pelo ID' })
  @ApiResponse({ status: 200, description: 'Equipamento retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Equipamento não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.equipamentosService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um equipamento' })
  @ApiResponse({ status: 200, description: 'Equipamento atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Equipamento não encontrado.' })
  update(@Param('id') id: string, @Body() updateEquipamentoDto: UpdateEquipamentoDto) {
    return this.equipamentosService.update(+id, updateEquipamentoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um equipamento' })
  @ApiResponse({ status: 200, description: 'Equipamento removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Equipamento não encontrado.' })
  remove(@Param('id') id: string) {
    return this.equipamentosService.remove(+id);
  }

  @Get(':id/disponibilidade')
  @ApiOperation({ summary: 'Verificar disponibilidade do equipamento' })
  @ApiResponse({ status: 200, description: 'Disponibilidade verificada com sucesso.' })
  checkAvailability(@Param('id') id: string, @Query('start') start: string, @Query('end') end: string) {
    return this.equipamentosService.checkAvailability(+id, new Date(start), new Date(end));
  }
}