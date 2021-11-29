import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './models/user-create.dto';
import { UserLoginDto } from './models/user-login.dto';
import { UserDto } from './models/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findOneUser(options?: any): Promise<UserDto> {
    return await this.userRepository.findOneUser(options);
  }

  async findByLogin(data: UserLoginDto): Promise<UserDto> {
    return await this.userRepository.findByLogin(data);
  }

  async findByPayload(payload: any): Promise<UserDto> {
    return await this.userRepository.findByPayload(payload);
  }

  async createUser(userDto: UserCreateDto): Promise<UserDto> {
    return await this.userRepository.createUser(userDto);
  }
}
