import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateFilmeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  linkImg: string;
}
