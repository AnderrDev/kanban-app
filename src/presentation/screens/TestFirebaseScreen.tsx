import { Text, View } from 'react-native';
import { auth } from '../../app/firebaseConfig';

export default function TestFirebaseScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Firebase conectado correctamente</Text>
      <Text>Usuario actual: {auth.currentUser?.email ?? 'No autenticado'}</Text>
    </View>
  );
}
