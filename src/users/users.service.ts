import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const [user] = await this.prisma.$transaction([
      this.prisma.user.create({ data: createUserDto }),
    ]);

    return user;
  }

  me(id: number) {
    return `This action returns a #${id} user`;
  }

  async updateName(id: number, updateUserDto: UpdateUserDto) {
    const [user] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      }),
    ]);

    return {
      name: user.name,
    };
  }

  async changePassword(id: number, oldPassword: string, newPassword: string) {
    //hash oldPassword and compare with the one in the database
    //if they match, hash newPassword and update the user's password
    //TODO: implement password hashing

    const [_user, _newPasswordUpdate] = await this.prisma.$transaction([
      this.prisma.user.findUnique({
        where: { id },
      }),
      this.prisma.user.update({
        where: { id },
        data: { password: newPassword },
      }),
    ]);

    return "This action changes a user's password";
  }
}
