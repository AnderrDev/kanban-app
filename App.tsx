import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/presentation/contexts/AuthContext';
import { StyleSheet } from 'react-native';
import LoginScreen from './src/presentation/screens/auth/LoginScreen';
import RegisterScreen from './src/presentation/screens/auth/RegisterScreen';
import KanbanBoardScreen from './src/presentation/screens/board/KanbanBoardScreen';
import { BoardProvider } from './src/presentation/contexts/BoardContext';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="KanbanBoard" component={KanbanBoardScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AuthProvider>
        <BoardProvider>
          <AppNavigation />
        </BoardProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
