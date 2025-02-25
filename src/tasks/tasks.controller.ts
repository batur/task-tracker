import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TaskEntity } from './entities/task.entity';

@Controller('tasks')
@ApiTags('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ operationId: 'createTask' })
  @ApiCreatedResponse({ type: TaskEntity })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ operationId: 'findAllTasks' })
  @ApiOkResponse({ type: TaskEntity, isArray: true })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ operationId: 'findTaskById' })
  @ApiOkResponse({ type: TaskEntity })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'updateTask' })
  @ApiOkResponse({ type: TaskEntity })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ operationId: 'removeTask' })
  @ApiOkResponse({ type: TaskEntity })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
