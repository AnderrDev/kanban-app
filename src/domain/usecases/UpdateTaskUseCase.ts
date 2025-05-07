import { ITaskRepository } from '../repositories/ITaskRepository';
import { Task } from '../../data/entities/Task';

export class UpdateTaskUseCase {
  constructor(private repository: ITaskRepository) {}

  async execute(task: Task): Promise<void> {
    await this.repository.updateTask(task);
  }
}
