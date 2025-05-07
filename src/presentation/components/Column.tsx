import { View, Text, StyleSheet } from 'react-native';
import { TaskCard } from './TaskCard';
import { Task } from '../../data/entities/Task';

interface ColumnProps {
  title: string;
  tasks: Task[];
  onTaskPress?: (task: Task) => void;
  color?: string;
}

export function Column({ title, tasks, onTaskPress, color = '#FFFFFF' }: ColumnProps) {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.header}>{title}</Text>

      <View style={styles.taskList}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onPress={() => onTaskPress?.(task)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 8,
    width: 280,
    maxHeight: '85%',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333333',
  },
  taskList: {
    flexGrow: 1,
  },
});
