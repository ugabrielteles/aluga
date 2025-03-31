import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { Usuario } from '../auth/entities/usuario.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('templates')
@UseGuards(JwtAuthGuard)
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo template de contrato' })
  @ApiResponse({ status: 201, description: 'Template criado com sucesso.' })
  create(@Body() createTemplateDto: CreateTemplateDto, @User() user: Usuario) {
    return this.templatesService.create(createTemplateDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os templates' })
  @ApiResponse({ status: 200, description: 'Lista de templates retornada com sucesso.' })
  findAll() {
    return this.templatesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um template pelo ID' })
  @ApiResponse({ status: 200, description: 'Template retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Template não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.templatesService.findOne(+id);
  }

  @Get('padrao')
  @ApiOperation({ summary: 'Obter template padrão' })
  @ApiResponse({ status: 200, description: 'Template padrão retornado com sucesso.' })
  findDefault() {
    return this.templatesService.findDefault();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um template' })
  @ApiResponse({ status: 200, description: 'Template atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Template não encontrado.' })
  update(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto) {
    return this.templatesService.update(+id, updateTemplateDto);
  }

  @Put(':id/set-padrao')
  @ApiOperation({ summary: 'Definir template como padrão' })
  @ApiResponse({ status: 200, description: 'Template definido como padrão com sucesso.' })
  setAsDefault(@Param('id') id: string) {
    return this.templatesService.setAsDefault(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um template' })
  @ApiResponse({ status: 200, description: 'Template removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Template não encontrado.' })
  remove(@Param('id') id: string) {
    return this.templatesService.remove(+id);
  }
}