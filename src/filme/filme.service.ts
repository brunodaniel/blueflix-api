import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { Filme } from '@prisma/client';

@Injectable()
export class FilmeService {
  constructor(private database: PrismaService) {}

  async create(dadosDoFilme: CreateFilmeDto): Promise<Filme> {
    const filmeExiste = await this.database.filme.findUnique({
      where: { title: dadosDoFilme },
    });

    if (filmeExiste) {
      throw new ConflictException('Esse filme já está cadastrado no sistema');
    }
    const filme = await this.database.filme.create({ data: dadosDoFilme });
    return filme;
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
