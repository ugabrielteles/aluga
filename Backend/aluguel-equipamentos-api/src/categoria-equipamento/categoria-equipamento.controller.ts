import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoriaEquipamentoService } from './categoria-equipamento.service';
import { CategoriaEquipamento } from './entities/categoria-equipamento.entity';
import { CreateCategoriaEquipamentoDto } from './dto/create-categoria-equipamento.dto';
import { UpdateCategoriaEquipamentoDto } from './dto/update-categoria-equipamento.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('categorias-equipamentos')
@Controller('categorias-equipamentos')
export class CategoriaEquipamentoController {
  constructor(private readonly categoriesService: CategoriaEquipamentoService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoriaEquipamentoDto): Promise<CategoriaEquipamento> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(): Promise<CategoriaEquipamento[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CategoriaEquipamento> {
    return this.categoriesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoriaEquipamentoDto,
  ): Promise<CategoriaEquipamento> {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(+id);
  }
}