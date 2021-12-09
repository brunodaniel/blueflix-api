import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { FilmeController } from './filme/filme.controller';
import { FilmeService } from './filme/filme.service';
import { FilmeModule } from './filme/filme.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UsersModule, FilmeModule],
  controllers: [AppController, FilmeController],
  providers: [AppService, FilmeService, PrismaService],
})
export class AppModule {}
