import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return User.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await User.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('Please check your login credentials.');
    }
  }
}
