import { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../app/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Error', 'Por favor completa todos los campos.');
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      // El AuthContext detectará el cambio automáticamente
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Error al iniciar sesión.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Iniciar Sesión</Text>

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

      <Button title="Entrar" onPress={handleLogin} />
      <Text
        style={{ marginTop: 20, textAlign: 'center' }}
        onPress={() => navigation.navigate('Register' as never)}
      >
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>
  );
}
