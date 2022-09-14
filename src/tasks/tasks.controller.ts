import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  async findAll(@GetUser() user: User): Promise<Task[]> {
    return this.tasksService.findAll(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateStatus(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
}
