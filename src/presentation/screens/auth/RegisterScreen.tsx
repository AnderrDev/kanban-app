import { useState } from 'react';
import { View, TextInput, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../app/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // 👈 Íconos de Expo

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Error', 'Por favor completa todos los campos.');
        return;
      }

      if (!validateEmail(email)) {
        Alert.alert('Error', 'El correo electrónico no es válido.');
        return;
      }

      if (password.length < 6) {
        Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Éxito', 'Usuario registrado correctamente. Ahora inicia sesión.');
      navigation.navigate('Login' as never);
    } catch (error: any) {
      console.error('Register error:', error);
      Alert.alert('Error', error.message || 'Error al registrarse.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarme</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    // borderWidth: 1,
    borderColor: '#DDD',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  icon: {
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 24,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#2196F3',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});
