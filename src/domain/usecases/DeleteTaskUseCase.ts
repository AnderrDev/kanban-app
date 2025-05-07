import { ITaskRepository } from '../repositories/ITaskRepository';

export class DeleteTaskUseCase {
  constructor(private repository: ITaskRepository) {}

  async execute(taskId: string): Promise<void> {
    await this.repository.deleteTask(taskId);
  }
}
