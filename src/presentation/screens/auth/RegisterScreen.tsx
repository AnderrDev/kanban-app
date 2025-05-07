import { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../app/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Error', 'Por favor completa todos los campos.');
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Éxito', 'Usuario registrado. Ahora inicia sesión.');
      navigation.navigate('Login' as never);
    } catch (error: any) {
      console.error('Register error:', error);
      Alert.alert('Error', error.message || 'Error al registrarse.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Registro</Text>

      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 12, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 12, borderBottomWidth: 1 }}
      />

      <Button title="Registrarme" onPress={handleRegister} />
      <Text
        style={{ marginTop: 20, textAlign: 'center' }}
        onPress={() => navigation.navigate('Login' as never)}
      >
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
    </View>
  );
}
