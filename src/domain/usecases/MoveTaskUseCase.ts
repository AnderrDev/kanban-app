import { ITaskRepository } from '../repositories/ITaskRepository';

export class MoveTaskUseCase {
  constructor(private repository: ITaskRepository) {}

  async execute(taskId: string, newStatus: 'todo' | 'inProgress' | 'done'): Promise<void> {
    await this.repository.moveTask(taskId, newStatus);
  }
}
