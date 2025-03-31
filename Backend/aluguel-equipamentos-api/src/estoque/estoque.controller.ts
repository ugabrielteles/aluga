import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Param, 
    Query, 
    UseGuards,
    HttpStatus
  } from '@nestjs/common';
  import { EstoqueService } from './estoque.service';
  import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
  import { FilterMovimentacoesDto } from './dto/filter-movimentacoes.dto';
  import { User } from '../auth/user.decorator';
  import { Usuario } from '../auth/entities/usuario.entity';
  
  @ApiBearerAuth()
  @ApiTags('estoque')
  @UseGuards(JwtAuthGuard)
  @Controller('estoque')
  export class EstoqueController {
    constructor(private readonly estoqueService: EstoqueService) {}
  
    @Post('movimentacao')
    @ApiOperation({ summary: 'Registrar uma nova movimentação de estoque' })
    @ApiResponse({ 
      status: HttpStatus.CREATED, 
      description: 'Movimentação registrada com sucesso' 
    })
    @ApiResponse({ 
      status: HttpStatus.BAD_REQUEST, 
      description: 'Dados inválidos' 
    })
    @ApiResponse({ 
      status: HttpStatus.NOT_FOUND, 
      description: 'Equipamento não encontrado' 
    })
    create(
      @Body() createMovimentacaoDto: CreateMovimentacaoDto,
      @User() usuario: Usuario
    ) {
      return this.estoqueService.create(createMovimentacaoDto, usuario);
    }
  
    @Get('movimentacoes')
    @ApiOperation({ summary: 'Listar todas as movimentações de estoque' })
    @ApiResponse({ 
      status: HttpStatus.OK, 
      description: 'Lista de movimentações retornada com sucesso' 
    })
    findAll(@Query() filterMovimentacoesDto: FilterMovimentacoesDto) {
      return this.estoqueService.findAll(filterMovimentacoesDto);
    }
  
    @Get('movimentacoes/equipamento/:equipamentoId')
    @ApiOperation({ summary: 'Listar movimentações de um equipamento específico' })
    @ApiResponse({ 
      status: HttpStatus.OK, 
      description: 'Lista de movimentações do equipamento retornada com sucesso' 
    })
    @ApiResponse({ 
      status: HttpStatus.NOT_FOUND, 
      description: 'Equipamento não encontrado' 
    })
    findByEquipamento(
      @Param('equipamentoId') equipamentoId: string,
      @Query() filterMovimentacoesDto: FilterMovimentacoesDto
    ) {
      return this.estoqueService.findByEquipamento(+equipamentoId, filterMovimentacoesDto);
    }
  
    @Get('saldo/equipamento/:equipamentoId')
    @ApiOperation({ summary: 'Consultar saldo atual de um equipamento' })
    @ApiResponse({ 
      status: HttpStatus.OK, 
      description: 'Saldo retornado com sucesso' 
    })
    @ApiResponse({ 
      status: HttpStatus.NOT_FOUND, 
      description: 'Equipamento não encontrado' 
    })
    getSaldo(@Param('equipamentoId') equipamentoId: string) {
      return this.estoqueService.getSaldo(+equipamentoId);
    }
  }