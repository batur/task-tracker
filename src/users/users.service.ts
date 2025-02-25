import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const isUserExist = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (isUserExist) {
      throw new BadRequestException('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      Number(process.env.SALT_ROUNDS),
    );

    // Create a new user
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  me(id: number) {
    return `This action returns a #${id} user`;
  }

  async updateName(id: string, updateUserDto: UpdateUserDto) {
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

  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    // First, retrieve the user from the database.
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Compare provided oldPassword with the hashed password stored in the database.
    const isMatch = await bcrypt.compare(
      changePasswordDto.oldPassword,
      user.password as string,
    );
    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      Number(process.env.SALT_ROUNDS),
    );

    // Update the user's password with the new hashed password
    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }
}
