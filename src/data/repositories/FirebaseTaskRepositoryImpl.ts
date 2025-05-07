import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { Task } from '../entities/Task';
import { db } from '../../app/firebaseConfig';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where
} from 'firebase/firestore';

export class FirebaseTaskRepositoryImpl implements ITaskRepository {
  private taskCollection = collection(db, 'tasks');

  async createTask(task: Task): Promise<void> {
    try {
      await addDoc(this.taskCollection, {
        title: task.title,
        description: task.description,
        status: task.status,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      });
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('No se pudo crear la tarea. Intenta de nuevo.');
    }
  }

  async updateTask(task: Task): Promise<void> {
    try {
      const taskDoc = doc(this.taskCollection, task.id);
      await updateDoc(taskDoc, {
        title: task.title,
        description: task.description,
        status: task.status,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('No se pudo actualizar la tarea.');
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    try {
      const taskDoc = doc(this.taskCollection, taskId);
      await deleteDoc(taskDoc);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('No se pudo eliminar la tarea.');
    }
  }

  async moveTask(taskId: string, newStatus: Task['status']): Promise<void> {
    try {
      const taskDoc = doc(this.taskCollection, taskId);
      await updateDoc(taskDoc, {
        status: newStatus,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error moving task:', error);
      throw new Error('No se pudo mover la tarea.');
    }
  }

  async getTasks(): Promise<Task[]> {
    try {
      console.log('Fetching tasks from Firestore...');
      
      const querySnapshot = await getDocs(this.taskCollection);
      const tasks: Task[] = [];

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        tasks.push({
          id: docSnap.id,
          title: data.title,
          description: data.description,
          status: data.status,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        });
      });
      console.log('tasks', tasks);
      
      return tasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw new Error('No se pudieron obtener las tareas.');
    }
  }
}
