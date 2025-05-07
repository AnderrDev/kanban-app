import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from 'react';
import { Task, TaskPriority } from '../../data/entities/Task';

interface EditTaskModalProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function EditTaskModal({ visible, task, onClose, onUpdate, onDelete }: EditTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Media');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    }
  }, [task]);

  const handleSave = () => {
    if (task) {
      const updatedTask: Task = {
        ...task,
        title,
        description,
        priority,
        updatedAt: new Date(),
      };
      onUpdate(updatedTask);
    }
  };

  const handleDelete = () => {
    if (task) {
      onDelete(task.id!);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.header}>Editar Tarea</Text>

          <TextInput
            placeholder="Título"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            placeholder="Descripción"
            style={[styles.input, { height: 80 }]}
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>Prioridad:</Text>
          <Picker
            selectedValue={priority}
            onValueChange={(itemValue) => setPriority(itemValue as TaskPriority)}
            style={styles.picker}
          >
            <Picker.Item label="Alta" value="Alta" />
            <Picker.Item label="Media" value="Media" />
            <Picker.Item label="Baja" value="Baja" />
          </Picker>

          <View style={styles.buttonRow}>
            <Button title="Guardar" onPress={handleSave} />
            <Button title="Eliminar" color="red" onPress={handleDelete} />
          </View>

          <Button title="Cancelar" color="#888" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    elevation: 6,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});
