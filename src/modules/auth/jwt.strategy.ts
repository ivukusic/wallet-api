import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { User } from '../user/user.entity';

import { AuthService } from './auth.service';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService,
  ) {
    // super({
    //   ignoreExpiration: false,
    //   secretOrKey: configService.get('JWT_SECRET'),
    //   jwtFromRequest: ExtractJwt.fromExtractors([
    //     (req: any) => {
    //       const { headers, cookies } = req;
    //       let token = cookies['auth-cookie'] || headers.authorization || '';
    //       if (token.includes('Bearer')) {
    //         token = token.split(' ')[1];
    //       }
    //       return token || null;
    //     },
    //   ]),
    // });
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtDto): Promise<User> {
    const currentUser = await this.authService.validateUser(payload);
    if (!currentUser) {
      throw new UnauthorizedException('unauthorized');
    }
    return currentUser;
  }
}
