import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { KitsService } from './kits.service';
import { CreateKitDto } from './dto/create-kit.dto';
import { UpdateKitDto } from './dto/update-kit.dto';
import { AddItemKitDto } from './dto/add-item-kit.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('kits')
@Controller('kits')
export class KitsController {
  constructor(private readonly kitsService: KitsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo kit' })
  @ApiResponse({ status: 201, description: 'Kit criado com sucesso.' })
  create(@Body() createKitDto: CreateKitDto) {
    return this.kitsService.create(createKitDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os kits' })
  @ApiResponse({ status: 200, description: 'Lista de kits retornada com sucesso.' })
  findAll() {
    return this.kitsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um kit pelo ID' })
  @ApiResponse({ status: 200, description: 'Kit retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Kit não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.kitsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um kit' })
  @ApiResponse({ status: 200, description: 'Kit atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Kit não encontrado.' })
  update(@Param('id') id: string, @Body() updateKitDto: UpdateKitDto) {
    return this.kitsService.update(+id, updateKitDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um kit' })
  @ApiResponse({ status: 200, description: 'Kit removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Kit não encontrado.' })
  remove(@Param('id') id: string) {
    return this.kitsService.remove(+id);
  }

  @Post(':id/itens')
  @ApiOperation({ summary: 'Adicionar item ao kit' })
  @ApiResponse({ status: 201, description: 'Item adicionado ao kit com sucesso.' })
  addItem(@Param('id') id: string, @Body() addItemKitDto: AddItemKitDto) {
    return this.kitsService.addItem(+id, addItemKitDto);
  }

  @Delete(':kitId/itens/:itemId')
  @ApiOperation({ summary: 'Remover item do kit' })
  @ApiResponse({ status: 200, description: 'Item removido do kit com sucesso.' })
  removeItem(@Param('kitId') kitId: string, @Param('itemId') itemId: string) {
    return this.kitsService.removeItem(+kitId, +itemId);
  }
}