import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { GraphQLQuery } from '@aws-amplify/api';
import { API } from 'aws-amplify';

import { CreateTodoInput, CreateTodoMutation } from '../API';
import * as mutations from '../graphql/mutations';

const CreateTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const createTodo = async () => {
    const todoDetails: CreateTodoInput = {
      name: title,
      description,
    };
    await API.graphql<GraphQLQuery<CreateTodoMutation>>({
      query: mutations.createTodo,
      variables: { input: todoDetails },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Task</Text>
      <View style={styles.formField}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      </View>
      <View style={styles.formField}>
        <Text style={styles.label}>Description (optional)</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <Button title="Add Task" onPress={createTodo} />
    </View>
  );
};

export default CreateTodo;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
