import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  birthdate: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 15)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 15)
  confirmPassword: string;
}
