import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

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

  @Patch(':id')
  @ApiOperation({ operationId: 'updateName' })
  @ApiOkResponse({ type: UpdateUserDto })
  updateName(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateName(+id, updateUserDto);
  }

  @Patch(':id/change-password')
  @ApiOperation({ operationId: 'changePassword' })
  @ApiOkResponse({ type: String })
  changePassword(
    @Param('id') id: string,
    @Body() body: { oldPassword: string; newPassword: string },
  ) {
    return this.usersService.changePassword(
      +id,
      body.oldPassword,
      body.newPassword,
    );
  }
}
