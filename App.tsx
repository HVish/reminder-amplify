import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Amplify } from 'aws-amplify';
// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native';

import awsconfig from './aws-exports';

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default withAuthenticator(App, { includeGreetings: true });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
