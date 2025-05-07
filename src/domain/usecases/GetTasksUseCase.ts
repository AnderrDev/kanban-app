import { ITaskRepository } from '../repositories/ITaskRepository';
import { Task } from '../../data/entities/Task';

export class GetTasksUseCase {
  constructor(private repository: ITaskRepository) {}

  async execute(): Promise<Task[]> {
    return this.repository.getTasks();
  }
}
