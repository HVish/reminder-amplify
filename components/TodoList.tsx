import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  GraphQLQuery,
  GraphQLSubscription,
  GRAPHQL_AUTH_MODE,
} from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';

import { ListTodosQuery, OnCreateTodoSubscription, Todo } from '../API';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import { getAccessToken } from '../utils/session';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchTodos() {
      const authToken = await getAccessToken();
      if (!authToken) return;
      const result = await API.graphql<GraphQLQuery<ListTodosQuery>>({
        query: queries.listTodos,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        authToken,
      });

      const todos =
        result.data?.listTodos?.items.filter((item): item is Todo =>
          Boolean(item)
        ) || [];

      setTodos(todos);
    }

    fetchTodos();
  }, []);

  useEffect(() => {
    const sub = API.graphql<GraphQLSubscription<OnCreateTodoSubscription>>(
      graphqlOperation(subscriptions.onCreateTodo)
    ).subscribe({
      next: ({ value }) => {
        const todo = value.data?.onCreateTodo;
        if (!todo) return;
        setTodos((todos) => [todo, ...todos]);
      },
      error: (error) => console.warn(error),
    });

    return () => sub.unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          title={todo.name}
          description={todo.description}
        />
      ))}
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});
