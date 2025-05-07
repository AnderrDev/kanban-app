import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
}

export function CreateTaskModal({ visible, onClose, onCreate }: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (title.trim() === '') {
      alert('El título no puede estar vacío.');
      return;
    }
    console.log('Creating task:', title, description);
    
    onCreate(title, description);
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
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
});
