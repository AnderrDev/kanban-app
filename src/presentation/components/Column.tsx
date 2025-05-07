import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TaskCard } from './TaskCard';
import { Task } from '../../data/entities/Task';

interface ColumnProps {
  title: string;
  tasks: Task[];
  onTaskPress?: (task: Task) => void;
}

export function Column({ title, tasks, onTaskPress }: ColumnProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => onTaskPress?.(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 8,
    flex: 1,
    maxHeight: '95%',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#555555',
  },
});
