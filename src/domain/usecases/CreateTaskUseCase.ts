import { ITaskRepository } from '../repositories/ITaskRepository';
import { Task } from '../../data/entities/Task';

export class CreateTaskUseCase {
  constructor(private repository: ITaskRepository) {}

  async execute(task: Task): Promise<void> {
    console.log('Creating task:', task);
  
    await this.repository.createTask(task);
  }
}
