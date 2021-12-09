import { Module } from '@nestjs/common';
import { FilmeService } from './filme.service';
import { FilmeController } from './filme.controller';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [FilmeController],
  providers: [FilmeService, PrismaService],
})
export class FilmeModule {}
