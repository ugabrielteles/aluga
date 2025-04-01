import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('categorias-equipamentos')
@Controller('categorias-equipamentos')
export class CategoriaController {
  constructor(private readonly categoriesService: CategoriaService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(): Promise<Categoria[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Categoria> {
    return this.categoriesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(+id);
  }
}