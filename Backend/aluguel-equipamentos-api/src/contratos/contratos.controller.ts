import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { AddItemContratoDto } from './dto/add-item-contrato.dto';
import { AddKitContratoDto } from './dto/add-kit-contrato.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../auth/user.decorator';
import { Usuario } from '../auth/entities/usuario.entity';
import { Response } from 'express';
import * as fs from 'fs';

@ApiBearerAuth()
@ApiTags('contratos')
@UseGuards(JwtAuthGuard)
@Controller('contratos')
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo contrato' })
  @ApiResponse({ status: 201, description: 'Contrato criado com sucesso.' })
  create(@Body() createContratoDto: CreateContratoDto, @User() user: Usuario) {
    return this.contratosService.create(createContratoDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os contratos' })
  @ApiResponse({ status: 200, description: 'Lista de contratos retornada com sucesso.' })
  findAll(@Query('status') status?: string) {
    return this.contratosService.findAll(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um contrato pelo ID' })
  @ApiResponse({ status: 200, description: 'Contrato retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Contrato não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.contratosService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um contrato' })
  @ApiResponse({ status: 200, description: 'Contrato atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Contrato não encontrado.' })
  update(@Param('id') id: string, @Body() updateContratoDto: UpdateContratoDto) {
    return this.contratosService.update(+id, updateContratoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um contrato' })
  @ApiResponse({ status: 200, description: 'Contrato removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Contrato não encontrado.' })
  remove(@Param('id') id: string) {
    return this.contratosService.remove(+id);
  }

  @Post(':id/itens')
  @ApiOperation({ summary: 'Adicionar item ao contrato' })
  @ApiResponse({ status: 201, description: 'Item adicionado ao contrato com sucesso.' })
  addItem(@Param('id') id: string, @Body() addItemDto: AddItemContratoDto) {
    return this.contratosService.addItem(+id, addItemDto);
  }

  @Post(':id/kits')
  @ApiOperation({ summary: 'Adicionar kit ao contrato' })
  @ApiResponse({ status: 201, description: 'Kit adicionado ao contrato com sucesso.' })
  addKit(@Param('id') id: string, @Body() addKitDto: AddKitContratoDto) {
    return this.contratosService.addKit(+id, addKitDto);
  }

  @Get(':id/pdf')
  @ApiOperation({ summary: 'Gerar PDF do contrato' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'PDF do contrato gerado com sucesso' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Contrato não encontrado' 
  })
  async generatePdf(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    try {
      const filePath = await this.contratosService.generateContratoPdf(+id);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=contrato_${id}.pdf`);
      
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
      
      fileStream.on('end', () => {
        // Opcional: remover o arquivo após enviar
        // fs.unlinkSync(filePath);
      });
      
    } catch (error) {
      throw error;
    }
  }

  @Put(':id/status/:statusId')
  @ApiOperation({ summary: 'Atualizar status do contrato' })
  @ApiResponse({ status: 200, description: 'Status atualizado com sucesso.' })
  updateStatus(@Param('id') id: string, @Param('statusId') statusId: string) {
    return this.contratosService.updateStatus(+id, +statusId);
  }

  
}