import { StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string;
  description?: string | null;
}

const TodoItem = ({ title, description }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 16,
    fontSize: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    color: 'grey',
  },
});
