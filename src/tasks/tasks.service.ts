import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../auth/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskStatus } from './tasks-status.enum';

@Injectable()
export class TasksService {
  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = Task.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await task.save();
    return task;
  }

  async findAll(user: User): Promise<Task[]> {
    const query = Task.createQueryBuilder('task');
    query.where({ user });

    const tasks = await query.getMany();
    return tasks;
  }

  async findOne(id: number, user: User): Promise<Task> {
    const query = Task.createQueryBuilder('task');
    query.where({ user }).andWhere({ id });
    const task = await query.getOne();

    if (!task) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }

    return task;
  }

  async updateStatus(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const { status } = updateTaskDto;

    const task = await this.findOne(id, user);
    task.status = status;
    await task.save();

    return task;
  }

  async remove(id: number, user: User): Promise<void> {
    const query = Task.createQueryBuilder('task');
    query.where({ id }).andWhere({ user });

    const task = await query.getOne();

    if (!task) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }

    await task.remove();
  }
}
