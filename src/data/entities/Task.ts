export type TaskStatus = 'todo' | 'inProgress' | 'done';
export type TaskPriority = 'Alta' | 'Media' | 'Baja'; // 👈 Agregamos prioridad

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  priority: TaskPriority; // 👈 Nuevo campo obligatorio
}
