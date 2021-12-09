import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFilmeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString()
  @IsNotEmpty()
  yearRelease: number;

  @IsString()
  @IsNotEmpty()
  linkImg: string;
}
