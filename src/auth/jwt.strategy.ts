import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './entities/user.entity';
import { JwtPayload } from './jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
// 'Strategy' must come from 'passport-jwt'.
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      secretOrKey: configService.get('JWT_SECRET'), // This needs to be exactly the same as the secret on the AuthModule.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // Override the parent's 'validate' method. This gets triggered after we know that the token is valid and does something after.
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;

    const user: User = await User.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException();
    }

    // When returning the user, Passport injects the User instance into the request object of the controllers so we always have access to it.
    return user;
  }
}
