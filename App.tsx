import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native';
import { Amplify } from 'aws-amplify';

import awsconfig from './aws-exports';
import CreateTodo from './components/CreateTodo';
import TodoList from './components/TodoList';

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

function App() {
  return (
    <View style={styles.container}>
      <CreateTodo />
      <TodoList />
      <StatusBar style="auto" />
    </View>
  );
}

export default withAuthenticator(App, { includeGreetings: true });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    padding: 16,
    backgroundColor: '#fff',
  },
});
