import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { LoginRequestDto } from './dto/login.dto';
import { TokenRequestDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginRequestDto: LoginRequestDto) {
    const { email, password } = loginRequestDto;
    const user = await this.userService.readUserByEmail(email, true);

    if (await bcrypt.compare(password, user.password)) {
      const accessToken = this.getJwtAccessToken(user);
      const refreshToken = this.getJwtRefreshToken(user);

      await this.updateRefreshToken(user, refreshToken);
      return { tokenType: 'bearer', accessToken, refreshToken };
    } else {
      throw new UnauthorizedException("The password doesn't match.");
    }
  }

  async updateRefreshToken(user: User, token: string | null = null) {
    user.refreshToken = token;
    return await this.userRepository.save(user);
  }

  async token(tokenRequestDto: TokenRequestDto) {
    const { refreshToken } = tokenRequestDto;
    const { id, exp } = this.checkJwtRefreshToken(refreshToken);

    let newRefhreshToken;

    const user = await this.userRepository.findById(id, true);

    if (!user || user.refreshToken !== refreshToken)
      throw new UnauthorizedException('Invalid or Missing JWT token.');

    const newAccessToken = this.getJwtAccessToken(user);

    if (exp < Math.floor(Date.now() / 1000) + 1 * 24 * 60 * 60) {
      newRefhreshToken = this.getJwtRefreshToken(user);
      await this.updateRefreshToken(user, newRefhreshToken);
    }
    return {
      tokenType: 'bearer',
      accessToken: newAccessToken,
      refhreshToken: newRefhreshToken,
    };
  }

  getJwtAccessToken(user: User) {
    const { id, email, name, phone } = user;
    const payload = { id, email, name, phone };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRESIN')}`,
    });

    return token;
  }

  getJwtRefreshToken(user: User) {
    const { id } = user;
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRESIN')}`,
    });

    return token;
  }

  checkJwtRefreshToken = (token: string) => {
    try {
      const jwtToken = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      });

      return jwtToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid or Missing JWT token.');
    }
  };
}
