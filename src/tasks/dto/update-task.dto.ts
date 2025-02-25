import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiPropertyOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  description: string;

  @ApiPropertyOptional({
    enum: Status,
    enumName: 'Status',
    example: [Status.TO_DO, Status.IN_PROGRESS, Status.DONE],
  })
  status: Status;
}
