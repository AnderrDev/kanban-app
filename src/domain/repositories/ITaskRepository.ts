import { Task } from '../../data/entities/Task';

export interface ITaskRepository {
  createTask(task: Task): Promise<void>;
  updateTask(task: Task): Promise<void>;
  deleteTask(taskId: string): Promise<void>;
  moveTask(taskId: string, newStatus: Task['status']): Promise<void>;
  getTasks(): Promise<Task[]>;
}
