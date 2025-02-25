import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  authorId: number;

  @ApiPropertyOptional({
    enum: Status,
    enumName: 'Status',
    example: [Status.TO_DO, Status.IN_PROGRESS, Status.DONE],
  })
  @IsEnum(Status)
  @IsOptional()
  status: Status;
}
