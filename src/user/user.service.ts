import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private database: PrismaService) {}

  async createUser(dadosDoUser: CreateUserDto): Promise<User> {
    if (dadosDoUser.password !== dadosDoUser.confirmPassword) {
      throw new UnauthorizedException(
        'A senha e a confirmação de senha devem ser iguais',
      );
    }

    const userExists = await this.database.user.findUnique({
      where: { email: dadosDoUser.email },
    });

    if (userExists) {
      throw new ConflictException('Esse e-mail já está cadastrado');
    }

    const saltos = 10;
    const hashDaSenha = await bcrypt.hash(dadosDoUser.password, saltos);

    delete dadosDoUser.confirmPassword;

    const user = await this.database.user.create({
      data: {
        ...dadosDoUser,
        password: hashDaSenha,
      },
    });
    delete user.password;
    return user;
  }

  async update(id: string, dadosDoUser: UpdateUserDto): Promise<User> {
    const user = await this.database.user.update({
      data: dadosDoUser,
      where: { id: id },
    });

    delete user.password;
    return user;
  }

  async findMany(): Promise<any[]> {
    const user = await this.database.user.findMany();
    const userNoPass = user.map(
      ({ password, updatedAt, createdAt, ...resto }) => resto,
    );
    return userNoPass;
  }

  async findUnique(id: string): Promise<User> {
    const user = await this.database.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(
        'Usuário com o ID informado não foi encontrado',
      );
    }
    delete user.password;
    return user;
  }

  async delete(id: string): Promise<{ message: string }> {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(
        'Usuário com o ID informado não foi encontrado',
      );
    } else {
      await this.database.user.delete({
        where: { id },
      });
    }

    return {
      message: 'Id foi encontrado e deletado com sucesso',
    };
  }
  async addList(user: User, filmeId: string) {
    const filme = await this.database.filme.findUnique({
      where: { id: filmeId },
    });
    if (!filme) {
      throw new NotFoundException('Filme não encontrado');
    }
    const usuario = await this.database.user.update({
      where: { id: user.id },
      data: {
        filmes: {
          connect: {
            id: filme.id,
          },
        },
      },
      include: {
        filmes: true,
      },
    });
    delete usuario.password;
    return usuario;
  }
}
