import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from 'src/user/models/user-create.dto';
import { UserLoginDto } from 'src/user/models/user-login.dto';
import { UserDto } from 'src/user/models/user.dto';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './jwt.strategy';
import { LoginStatus } from './models/login-status.interface';
import { RegistrationStatus } from './models/registration-status.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: UserCreateDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'User registered successfully',
    };

    try {
      await this.userService.createUser(userDto);
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  async login(userDto: UserLoginDto): Promise<LoginStatus> {
    const user = await this.userService.findByLogin(userDto);

    const token = this._createToken(user);
    return {
      username: user.username,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token!!!', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ username }: UserDto): any {
    const expiresIn = 3600;
    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }
}
