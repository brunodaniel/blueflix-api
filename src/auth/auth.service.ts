import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private database: PrismaService, private jwt: JwtService) {}
  async login(dadosDoLogin: CredentialsDto) {
    const usuarioExiste = await this.database.user.findUnique({
      where: { email: dadosDoLogin.email },
    });

    if (!usuarioExiste) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const senhaValida = await bcrypt.compare(
      dadosDoLogin.password,
      usuarioExiste.password,
    );

    if (senhaValida) {
      const payload = {
        email: usuarioExiste.email,
      };
      const token = await this.jwt.sign({ payload });
      return { token };
    } else {
      throw new UnauthorizedException('Credenciais invalidas');
    }
  }
}
