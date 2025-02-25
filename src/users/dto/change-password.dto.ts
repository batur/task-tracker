import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 0,
    },
    {
      message: 'Password is too weak. Should be at least 8 characters long',
    },
  )
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 0,
    },
    {
      message: 'Password is too weak. Should be at least 8 characters long',
    },
  )
  @IsNotEmpty()
  newPassword: string;
}
