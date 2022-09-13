import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskStatus } from './tasks-status.enum';

@Injectable()
export class TasksService {
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = Task.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await task.save();
    return task;
  }

  async findAll(): Promise<Task[]> {
    const tasks = await Task.find();
    return tasks;
  }

  async findOne(id: number): Promise<Task> {
    const task = await Task.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }

    return task;
  }

  async updateStatus(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { status } = updateTaskDto;

    const task = await this.findOne(id);
    task.status = status;
    await task.save();

    return task;
  }

  async remove(id: number): Promise<Task> {
    const task = await this.findOne(id);
    await task.remove();

    return task;
  }
}
