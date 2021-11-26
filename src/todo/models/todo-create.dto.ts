import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Status } from './status.enum';

export class TodoCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  description?: string;
  @IsBoolean()
  isActive?: boolean;
  @IsString()
  status?: Status;
}
