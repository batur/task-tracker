import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  authorId: string;

  @ApiPropertyOptional({
    enum: Status,
    enumName: 'Status',
    example: [Status.TO_DO, Status.IN_PROGRESS, Status.DONE],
  })
  @IsEnum(Status)
  @IsOptional()
  status: Status;
}
