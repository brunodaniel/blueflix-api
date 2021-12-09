import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { Filme } from '@prisma/client';

@Injectable()
export class FilmeService {
  constructor(private database: PrismaService) {}

  async create(dadosDoFilme: CreateFilmeDto): Promise<Filme> {
    return 'This action adds a new filme';
  }

  findAll() {
    return `This action returns all filme`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filme`;
  }

  update(id: number, updateFilmeDto: UpdateFilmeDto) {
    return `This action updates a #${id} filme`;
  }

  remove(id: number) {
    return `This action removes a #${id} filme`;
  }
}
