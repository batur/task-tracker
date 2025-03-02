import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.me(username);
    const hashedPassword = await bcrypt.hash(
      pass,
      Number(process.env.SALT_ROUNDS),
    );
    const isMatch = await bcrypt.compare(
      hashedPassword,
      user?.password as string,
    );

    if (!isMatch) {
      throw new BadRequestException('Invalid password');
    }

    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
    };
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }
}
