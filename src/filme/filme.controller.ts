import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FilmeService } from './filme.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { Filme } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('filme')
export class FilmeController {
  constructor(private readonly filmeService: FilmeService) {}

  @Post('create')
  create(@Body() CreateFilmeDto: CreateFilmeDto): Promise<Filme> {
    return this.filmeService.create(CreateFilmeDto);
  }

  @Get('get-all')
  findAll(): Promise<Filme[]> {
    return this.filmeService.findAll();
  }

  @UseGuards(AuthGuard())
  @Get('find-one/:id')
  findOne(@Param('id') id: string): Promise<Filme> {
    return this.filmeService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateFilmeDto: UpdateFilmeDto,
  ): Promise<Filme> {
    return this.filmeService.update(id, updateFilmeDto);
  }

  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.filmeService.remove(id);
  }
}
