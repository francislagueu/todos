import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
