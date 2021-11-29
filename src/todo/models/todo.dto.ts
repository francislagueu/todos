import { IsString, IsBoolean, IsNumber } from 'class-validator';
import { UserDto } from 'src/user/models/user.dto';
import { Status } from './status.enum';

export class TodoDto {
  @IsNumber()
  id: number;
  @IsString()
  title: string;
  @IsString()
  description?: string;
  @IsBoolean()
  isActive?: boolean;
  @IsString()
  status?: Status;

  owner?: UserDto;
}
