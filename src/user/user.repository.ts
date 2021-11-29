import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserLoginDto } from './models/user-login.dto';
import { UserDto } from './models/user.dto';
import { UserEntity } from './models/user.entity';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './models/user-create.dto';
import { toUserDto } from 'src/utils/mapper';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async getOneUser(options: any): Promise<UserEntity> {
    const user = await this.findOne(options);
    if (!user) {
      throw new HttpException('User not found!!!', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async findByUsername(username: string): Promise<UserDto> {
    const user = await this.findOne({ username });
    return toUserDto(user);
  }

  async findOneUser(options: any): Promise<UserDto> {
    const user = await this.findOne(options);
    return toUserDto(user);
  }

  async findByLogin({ username, password }: UserLoginDto): Promise<UserDto> {
    const user = await this.findOne({ where: { username } });
    if (!user) {
      throw new HttpException('User not found!!!', HttpStatus.UNAUTHORIZED);
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new HttpException(
        'Invalid credentials!!!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return toUserDto(user);
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.findOneUser({ where: { username } });
  }

  async createUser(userDto: UserCreateDto): Promise<UserDto> {
    const { username, email, password } = userDto;
    const user = await this.findOne({ where: { username } });
    if (user) {
      throw new HttpException('User already exists!!!', HttpStatus.BAD_REQUEST);
    }
    let newUser = this.create({ username, email, password });
    newUser = await this.save(newUser);
    return toUserDto(newUser);
  }
}
