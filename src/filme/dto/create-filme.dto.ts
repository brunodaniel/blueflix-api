import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

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
  yearRelease: string;

  @IsString()
  @IsNotEmpty()
  linkImg: string;

  @IsBoolean()
  @IsNotEmpty()
  watched: boolean;
}
