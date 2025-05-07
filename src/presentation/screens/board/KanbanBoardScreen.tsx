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
import { Picker } from '@react-native-picker/picker'; // 👈

export default function KanbanBoardScreen() {
  const { tasks, addTask, updateTask, deleteTask } = useBoard();
  const { logout } = useAuth();
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [priorityFilter, setPriorityFilter] = useState<'all' | TaskPriority>('all');
  const [dateOrder, setDateOrder] = useState<'newest' | 'oldest'>('newest'); // 👈 Nuevo estado

  const filteredAndSortedTasks = tasks
    .filter(task =>
      priorityFilter === 'all' || task.priority === priorityFilter
    )
    .sort((a, b) => {
      if (dateOrder === 'newest') {
        return b.createdAt.getTime() - a.createdAt.getTime(); // Más nuevas primero
      } else {
        return a.createdAt.getTime() - b.createdAt.getTime(); // Más viejas primero
      }
    });

  const todoTasks = filteredAndSortedTasks.filter(task => task.status === 'todo');
  const inProgressTasks = filteredAndSortedTasks.filter(task => task.status === 'inProgress');
  const doneTasks = filteredAndSortedTasks.filter(task => task.status === 'done');

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

        {/* Filtros */}
        <View style={styles.filtersContainer}>
          <View style={styles.filterGroup}>
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

          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Ordenar por fecha:</Text>
            <Picker
              selectedValue={dateOrder}
              onValueChange={(itemValue) => setDateOrder(itemValue as 'newest' | 'oldest')}
              style={styles.picker}
            >
              <Picker.Item label="Más recientes primero" value="newest" />
              <Picker.Item label="Más antiguas primero" value="oldest" />
            </Picker>
          </View>
        </View>

        {/* Tablero */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.board}>
          <Column title="To Do" tasks={todoTasks} onTaskPress={handleTaskPress} color="#AEDFF7" />
          <Column title="In Progress" tasks={inProgressTasks} onTaskPress={handleTaskPress} color="#FFE58A" />
          <Column title="Done" tasks={doneTasks} onTaskPress={handleTaskPress} color="#B7E7A1" />
        </ScrollView>

        {/* Botón flotante y modales */}
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
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  filterGroup: {
    flex: 1,
    marginHorizontal: 8,
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
