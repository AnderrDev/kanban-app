import { FirebaseTaskRepositoryImpl } from '../data/repositories/FirebaseTaskRepositoryImpl';
import { CreateTaskUseCase } from '../domain/usecases/CreateTaskUseCase';
import { DeleteTaskUseCase } from '../domain/usecases/DeleteTaskUseCase';
import { GetTasksUseCase } from '../domain/usecases/GetTasksUseCase';
import { MoveTaskUseCase } from '../domain/usecases/MoveTaskUseCase';
import { UpdateTaskUseCase } from '../domain/usecases/UpdateTaskUseCase';

const taskRepository = new FirebaseTaskRepositoryImpl();

export const createTaskUseCase = new CreateTaskUseCase(taskRepository);
export const moveTaskUseCase = new MoveTaskUseCase(taskRepository);
export const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
export const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
export const getTasksUseCase = new GetTasksUseCase(taskRepository);
