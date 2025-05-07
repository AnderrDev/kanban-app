import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { TaskPriority } from '../../data/entities/Task';

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string, priority: TaskPriority) => void;
}

export function CreateTaskModal({ visible, onClose, onCreate }: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Media');

  const handleSave = () => {
    if (title.trim() === '') {
      alert('El título no puede estar vacío.');
      return;
    }

    onCreate(title, description, priority);
    setTitle('');
    setDescription('');
    setPriority('Media');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.header}>Crear Nueva Tarea</Text>

          <TextInput
            placeholder="Título"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            placeholder="Descripción"
            style={[styles.input, { height: 100 }]}
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

          <Button title="Guardar Tarea" onPress={handleSave} />
          <View style={{ height: 12 }} />
          <Button title="Cancelar" color="#888" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    width: '90%',
    elevation: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 6,
    marginBottom: 16,
  },
});
