import { ScrollView, StyleSheet, View, Button, Text } from 'react-native';
import { Column } from '../../components/Column';
import { useBoard } from '../../contexts/BoardContext';
import { useAuth } from '../../contexts/AuthContext';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { CreateTaskModal } from '../../components/CreateTaskModal';
import { EditTaskModal } from '../../components/EditTaskModal';
import { useState } from 'react';
import { Task, TaskStatus, TaskPriority } from '../../../data/entities/Task';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker'; // 👈 Instala si no lo tienes

export default function KanbanBoardScreen() {
  const { tasks, addTask, updateTask, deleteTask } = useBoard();
  const { logout } = useAuth();
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<'all' | TaskPriority>('all'); // 👈 Nuevo estado

  const filteredTasks = tasks.filter(task => 
    priorityFilter === 'all' || task.priority === priorityFilter
  );

  const todoTasks = filteredTasks.filter(task => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'inProgress');
  const doneTasks = filteredTasks.filter(task => task.status === 'done');

  const handleCreateTask = async (title: string, description: string, priority: TaskPriority) => {
    const newTask = {
      title,
      description,
      status: 'todo' as TaskStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
      priority,
    };
    await addTask(newTask as Task);
    setCreateModalVisible(false);
  };

  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
    setEditModalVisible(true);
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    await updateTask(updatedTask);
    setEditModalVisible(false);
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    setEditModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Tablero Kanban</Text>
          <Button title="Cerrar sesión" onPress={logout} />
        </View>

        {/* Picker de filtro */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Filtrar por prioridad:</Text>
          <Picker
            selectedValue={priorityFilter}
            onValueChange={(itemValue) => setPriorityFilter(itemValue as 'all' | TaskPriority)}
            style={styles.picker}
          >
            <Picker.Item label="Todas" value="all" />
            <Picker.Item label="Alta" value="Alta" />
            <Picker.Item label="Media" value="Media" />
            <Picker.Item label="Baja" value="Baja" />
          </Picker>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.board}>
          <Column title="To Do" tasks={todoTasks} onTaskPress={handleTaskPress} color="#AEDFF7" />
          <Column title="In Progress" tasks={inProgressTasks} onTaskPress={handleTaskPress} color="#FFE58A" />
          <Column title="Done" tasks={doneTasks} onTaskPress={handleTaskPress} color="#B7E7A1" />
        </ScrollView>

        <FloatingActionButton onPress={() => setCreateModalVisible(true)} />

        <CreateTaskModal
          visible={isCreateModalVisible}
          onClose={() => setCreateModalVisible(false)}
          onCreate={handleCreateTask}
        />

        <EditTaskModal
          visible={isEditModalVisible}
          task={selectedTask}
          onClose={() => setEditModalVisible(false)}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  picker: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  board: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
});
