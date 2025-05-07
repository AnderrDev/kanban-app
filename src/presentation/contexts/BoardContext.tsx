import { createContext, useContext, useEffect, useState } from 'react';
import { createTaskUseCase, deleteTaskUseCase, getTasksUseCase, moveTaskUseCase, updateTaskUseCase } from '../../app/DependencyContainer';
import { Task, TaskStatus } from '../../data/entities/Task';

interface BoardContextType {
  tasks: Task[];
  loadTasks: () => Promise<void>;
  addTask: (task: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  moveTask: (taskId: string, newStatus: TaskStatus) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

const BoardContext = createContext<BoardContextType>({
  tasks: [],
  loadTasks: async () => {},
  addTask: async () => {},
  updateTask: async () => {},
  moveTask: async () => {},
  deleteTask: async () => {},
});

export const useBoard = () => useContext(BoardContext);

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    try {
      const loadedTasks = await getTasksUseCase.execute();
      setTasks(loadedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const addTask = async (task: Task) => {
    try {
      await createTaskUseCase.execute(task);
      await loadTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      await updateTaskUseCase.execute(task);
      await loadTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const moveTask = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await moveTaskUseCase.execute(taskId, newStatus);
      await loadTasks();
    } catch (error) {
      console.error('Error moving task:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await deleteTaskUseCase.execute(taskId);
      await loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <BoardContext.Provider value={{ tasks, loadTasks, addTask, updateTask, moveTask, deleteTask }}>
      {children}
    </BoardContext.Provider>
  );
}
