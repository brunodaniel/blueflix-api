import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(6, 150)
  name: string;

  @IsEmail()
  @IsString()
  email: string;
}
