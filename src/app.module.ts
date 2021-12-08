import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { FilmesModule } from './filmes/filme.module';
import { FilmeController } from './filme/filme.controller';
import { FilmeService } from './filme/filme.service';
import { FilmeModule } from './filme/filme.module';

@Module({
  imports: [UsersModule, FilmesModule, FilmeModule],
  controllers: [AppController, FilmeController],
  providers: [AppService, FilmeService],
})
export class AppModule {}
