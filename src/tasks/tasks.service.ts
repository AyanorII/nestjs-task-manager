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

  async remove(id: number): Promise<void> {
    // Using delete() instead of remove() because the latter needs an instance of the entity, so we would need to make one extra query to find the instance, then another one to remove it. With delete(), we just need the ID of the instance we want to remove.
    const result = await Task.delete(id);

    // Checks if the number of deleted rows is 0, which means that the task with the given ID does not exist and throws a NotFoundException
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }
  }
}
