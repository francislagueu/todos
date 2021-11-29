import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserLoginDto } from './models/user-login.dto';
import { UserDto } from './models/user.dto';
import { UserEntity } from './models/user.entity';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './models/user-create.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findByUsername(username: string): Promise<UserDto> {
    const user = await this.findOne({ username });
    return this.toUserDto(user);
  }

  async findOneUser(options: any): Promise<UserDto> {
    const user = await this.findOne(options);
    return this.toUserDto(user);
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
    return this.toUserDto(user);
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
    return this.toUserDto(newUser);
  }

  private toUserDto = (user: UserEntity): UserDto => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createOn: user.createOn,
      updateOn: user.updateOn,
    };
  };
}
