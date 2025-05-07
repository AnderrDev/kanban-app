import { View, Text, StyleSheet } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { TaskCard } from './TaskCard';
import { Task } from '../../data/entities/Task';

interface ColumnProps {
  title: string;
  tasks: Task[];
  onTaskPress?: (task: Task) => void;
  onTaskDrop?: (task: Task, newIndex: number) => void;
}

export function Column({ title, tasks, onTaskPress, onTaskDrop }: ColumnProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>

      <DraggableFlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item, drag, isActive }) => (
          <ScaleDecorator>
            <TaskCard
              task={item}
              onPress={() => onTaskPress?.(item)}
            />
          </ScaleDecorator>
        )}
        onDragEnd={({ data, from, to }) => {
          if (onTaskDrop) {
            onTaskDrop(data[to], to);
          }
        }}
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
