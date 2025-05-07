import { View, StyleSheet, Text } from 'react-native';
import Board from 'react-native-dnd-board';
import { useBoard } from '../../contexts/BoardContext';
import { useState, useEffect } from 'react';
import { Task } from '../../../data/entities/Task';

export default function KanbanBoardDndScreen() {
  const { tasks, moveTask } = useBoard();
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    // Agrupar tareas en columnas
    const todoTasks = tasks.filter(task => task.status === 'todo');
    const inProgressTasks = tasks.filter(task => task.status === 'inProgress');
    const doneTasks = tasks.filter(task => task.status === 'done');

    setColumns([
      {
        id: 'todo',
        name: 'To Do',
        rows: todoTasks.map(task => ({ ...task })),
      },
      {
        id: 'inProgress',
        name: 'In Progress',
        rows: inProgressTasks.map(task => ({ ...task })),
      },
      {
        id: 'done',
        name: 'Done',
        rows: doneTasks.map(task => ({ ...task })),
      },
    ]);
  }, [tasks]);

  interface DragEndParams {
    fromColumnId: string;
    toColumnId: string;
    item: Task;
  }

  const handleDragEnd = async ({ fromColumnId, toColumnId, item }: DragEndParams) => {
    if (fromColumnId !== toColumnId) {
      console.log(`Mover ${item.title} de ${fromColumnId} a ${toColumnId}`);
      await moveTask(item.id!, toColumnId as any); // 👈 Actualizamos en Firestore
    }
  };

  return (
    <View style={styles.container}>
      <Board
        columns={columns}
        onDragEnd={handleDragEnd}
        renderCard={(card: Task) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
  },
});
