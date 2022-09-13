import { PartialType } from '@nestjs/mapped-types';
import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks-status.enum';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
