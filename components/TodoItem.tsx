import { StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string;
  description?: string | null;
}

const TodoItem = ({ title, description }: Props) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      {description && <Text>{description}</Text>}
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    border: '1px solid #eee',
    fontSize: 12,
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    color: 'grey',
  },
});
