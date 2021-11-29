import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserCreateDto } from 'src/user/models/user-create.dto';
import { UserLoginDto } from 'src/user/models/user-login.dto';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt.strategy';
import { LoginStatus } from './models/login-status.interface';
import { RegistrationStatus } from './models/registration-status.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() user: UserCreateDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(user);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('login')
  public async login(@Body() user: UserLoginDto): Promise<LoginStatus> {
    return await this.authService.login(user);
  }

  @Get('me')
  @UseGuards(AuthGuard())
  public async me(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }
}
