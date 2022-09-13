import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return User.createUser(authCredentialsDto);
  }
}
