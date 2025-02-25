import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ operationId: 'createUser' })
  @ApiCreatedResponse({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ operationId: 'me' })
  @ApiOkResponse({ type: CreateUserDto })
  me(@Param('id') id: string) {
    return this.usersService.me(+id);
  }

  @Put(':id')
  @ApiOperation({ operationId: 'updateName' })
  @ApiOkResponse({ type: UpdateUserDto })
  updateName(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateName(id, updateUserDto);
  }

  @Put(':id/change-password')
  @ApiOperation({ operationId: 'changePassword' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Password changed successfully',
  })
  changePassword(@Param('id') id: string, @Body() body: ChangePasswordDto) {
    return this.usersService.changePassword(id, body);
  }
}
