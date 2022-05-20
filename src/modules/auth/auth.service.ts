import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenError } from 'apollo-server-express';

import { SecurityConfig } from 'src/configs/config.interface';

import { User } from '../user/user.entity';
import { Auth } from './auth.model';
import { JwtDto } from './dto/jwt.dto';
import { AuthRefreshTokenInput } from './input/authRefreshToken.input';
import { AuthSignupInput } from './input/authSignup.input';
import { Token } from './token.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly em: EntityManager,
  ) {}

  async updateDeviceGenerateUserToken(user: User): Promise<Auth> {
    return { ...this.generateToken({ userId: user.id }), user };
  }

  async authSignup(data: AuthSignupInput): Promise<Auth> {
    const { email } = data;
    const user = await this.em.findOne(
      User,
      { email },
      { populate: ['accounts'] },
    );

    if (user) {
      return this.updateDeviceGenerateUserToken(user);
    }
    try {
      const user = await this.em.create(User, data);
      await this.em.persistAndFlush(user);
      return await this.updateDeviceGenerateUserToken(user);
    } catch (e) {
      throw new Error(e);
    }
  }

  authRefreshToken({ refreshToken }: AuthRefreshTokenInput) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      return this.generateToken(payload);
    } catch (e) {
      throw new ForbiddenError('tokenExpired');
    }
  }

  generateToken(payload: { userId?: string }): Token {
    const accessToken = this.jwtService.sign(payload);
    const securityConfig = this.configService.get<SecurityConfig>('security');
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: securityConfig.refreshIn,
    });
    return { accessToken, refreshToken };
  }

  async validateUser(data: JwtDto): Promise<User> {
    return this.em.findOne(
      User,
      { id: data.userId },
      { populate: ['accounts'] },
    );
  }
}
