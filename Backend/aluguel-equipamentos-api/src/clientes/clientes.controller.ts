import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Param, 
    Put, 
    Delete, 
    Query, 
    UsePipes, 
    ValidationPipe 
  } from '@nestjs/common';
  import { ClientesService } from './clientes.service';
  import { CreateClienteDto } from './dto/create-cliente.dto';
  import { UpdateClienteDto } from './dto/update-cliente.dto';
  import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { UseGuards } from '@nestjs/common';
  
  @ApiBearerAuth()
  @ApiTags('clientes')
  @UseGuards(JwtAuthGuard)
  @Controller('clientes')
  export class ClientesController {
    constructor(private readonly clientesService: ClientesService) {}
  
    @Post()
    @UsePipes(new ValidationPipe())
    @ApiOperation({ summary: 'Criar novo cliente' })
    @ApiResponse({ 
      status: 201, 
      description: 'Cliente criado com sucesso.' 
    })
    @ApiResponse({ 
      status: 400, 
      description: 'Dados inválidos.' 
    })
    create(@Body() createClienteDto: CreateClienteDto) {
      return this.clientesService.create(createClienteDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Listar todos os clientes' })
    @ApiResponse({ 
      status: 200, 
      description: 'Lista de clientes retornada com sucesso.' 
    })
    findAll(@Query('search') search?: string) {
      return this.clientesService.findAll(search);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Obter um cliente pelo ID' })
    @ApiResponse({ 
      status: 200, 
      description: 'Cliente retornado com sucesso.' 
    })
    @ApiResponse({ 
      status: 404, 
      description: 'Cliente não encontrado.' 
    })
    findOne(@Param('id') id: string) {
      return this.clientesService.findOne(+id);
    }
  
    @Put(':id')
    @UsePipes(new ValidationPipe())
    @ApiOperation({ summary: 'Atualizar um cliente' })
    @ApiResponse({ 
      status: 200, 
      description: 'Cliente atualizado com sucesso.' 
    })
    @ApiResponse({ 
      status: 404, 
      description: 'Cliente não encontrado.' 
    })
    update(
      @Param('id') id: string, 
      @Body() updateClienteDto: UpdateClienteDto
    ) {
      return this.clientesService.update(+id, updateClienteDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Remover um cliente' })
    @ApiResponse({ 
      status: 200, 
      description: 'Cliente removido com sucesso.' 
    })
    @ApiResponse({ 
      status: 404, 
      description: 'Cliente não encontrado.' 
    })
    remove(@Param('id') id: string) {
      return this.clientesService.remove(+id);
    }
  
    /*@Get(':id/contratos')
    @ApiOperation({ summary: 'Obter contratos de um cliente' })
    @ApiResponse({ 
      status: 200, 
      description: 'Contratos do cliente retornados com sucesso.' 
    })
    @ApiResponse({ 
      status: 404, 
      description: 'Cliente não encontrado.' 
    })
    getContratos(@Param('id') id: string) {
      return this.clientesService.getContratos(+id);
    }*/
  }