import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Task, TaskStatus } from '../../data/entities/Task';

interface EditTaskModalProps {
    visible: boolean;
    task: Task | null;
    onClose: () => void;
    onUpdate: (updatedTask: Task) => void;
    onDelete: (taskId: string) => void; // 👈 NUEVO
  }
  
  export function EditTaskModal({ visible, task, onClose, onUpdate, onDelete }: EditTaskModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<TaskStatus>('todo');
  
    useEffect(() => {
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
      }
    }, [task]);
  
    const handleUpdate = () => {
      if (!task) return;
  
      const updatedTask: Task = {
        ...task,
        title,
        description,
        status,
      };
  
      onUpdate(updatedTask);
      onClose();
    };
  
    const handleDelete = () => {
      if (!task) return;
  
      // onDelete(task.id);
      onClose();
    };
  
    if (!task) return null;
  
    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={onClose}
      >
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
              style={[styles.input, { height: 100 }]}
              value={description}
              onChangeText={setDescription}
              multiline
            />
  
            <Button title="Guardar Cambios" onPress={handleUpdate} />
            <View style={{ height: 12 }} />
            <Button title="Eliminar Tarea" color="red" onPress={handleDelete} />
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
