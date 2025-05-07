import { ScrollView, StyleSheet, View, Button } from 'react-native';
import { Column } from '../../components/Column';
import { useBoard } from '../../contexts/BoardContext';
import { useAuth } from '../../contexts/AuthContext';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { CreateTaskModal } from '../../components/CreateTaskModal';
import { EditTaskModal } from '../../components/EditTaskModal'; // 👈
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from '../../../data/entities/Task';


export default function KanbanBoardScreen() {
  const { tasks, addTask, moveTask, updateTask, deleteTask } = useBoard();
  const { logout } = useAuth();
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'inProgress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  const handleTaskDrop = async (task: any, newStatus: TaskStatus) => {
    if (task.status !== newStatus) {
      await moveTask(task.id, newStatus);
    }
  };

  const handleCreateTask = async (title: string, description: string) => {
    console.log('Creating task:', title, description);
    
    const newTask: Task = {
      title,
      description,
      status: 'todo',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('New task:', newTask);
    
    await addTask(newTask);
  };

  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
    setEditModalVisible(true);
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    await updateTask(updatedTask);
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
  };


  return (
    <View style={styles.container}>
      <Button title="Cerrar sesión" onPress={logout} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.board}>
          <Column title="To Do" tasks={todoTasks} onTaskPress={handleTaskPress} onTaskDrop={(task) => handleTaskDrop(task, 'todo')} />
          <Column title="In Progress" tasks={inProgressTasks} onTaskPress={handleTaskPress} onTaskDrop={(task) => handleTaskDrop(task, 'inProgress')} />
          <Column title="Done" tasks={doneTasks} onTaskPress={handleTaskPress} onTaskDrop={(task) => handleTaskDrop(task, 'done')} />
        </View>
      </ScrollView>

      {/* Botón flotante */}
      <FloatingActionButton onPress={() => setCreateModalVisible(true)} />

      {/* Modal de crear tarea */}
      <CreateTaskModal
        visible={isCreateModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreate={handleCreateTask}
      />

      {/* Modal de editar tarea */}
      <EditTaskModal
        visible={isEditModalVisible}
        task={selectedTask}
        onClose={() => setEditModalVisible(false)}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask} // 👈 NUEVO
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    paddingTop: 40,
  },
  board: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
});
